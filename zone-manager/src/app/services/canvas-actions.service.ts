import { Injectable } from '@angular/core';
import { filter, fromEvent, map, Subscription, tap } from 'rxjs';

import { ConfigService } from './config.service';
import { ZoneStoreService } from '../store/zone-store.service';


@Injectable({
  providedIn: 'root'
})
export class CanvasActionsService {
  private canvas!: HTMLCanvasElement
  private context!: CanvasRenderingContext2D
  private MAX_POINT = this.configService.getConfig().maxPoint

  private subscriptions: Subscription = new Subscription();

  constructor(private zoneStoreService: ZoneStoreService,
    private configService: ConfigService
  ) { }

  public init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas
    this.setCanvasDimensions();
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.zoneStoreService.getIsDrawingZone().subscribe(isDrawing => {
      if (isDrawing) {
        this.enableCanvas();
      } else {
        this.disableCanvas();
      }
    })
  }

  public destroy() {
    this.subscriptions.unsubscribe();
  }
  public clearCanvas(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private enableCanvas(): void {
    const mouseMove$ = fromEvent<MouseEvent>(this.canvas, 'mousemove').pipe(
      tap(event => this.onMouseMove(event))
    );

    const mouseClick$ = fromEvent<MouseEvent>(this.canvas, 'click').pipe(
      filter(() => this.zoneStoreService.getPolygon().length < this.MAX_POINT),
      map((event: MouseEvent) => this.getCanvasCoordinates(event)),
      tap((point: number[]) => this.onCanvasClick(point))
    );

    this.subscriptions.add(mouseMove$.subscribe());
    this.subscriptions.add(mouseClick$.subscribe());
  }

  private disableCanvas(): void {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription(); // reset subscriptions
  }

  public drawPolygon(polygon: number[][]): void {
    this.clearCanvas()
    if (polygon.length !== this.MAX_POINT) return;

    this.drawExistingPoints(polygon);

    this.context.strokeStyle = 'red';
    this.context.lineWidth = 2;

    this.context.beginPath();
    this.context.moveTo(polygon[0][0], polygon[0][1]);

    for (let i = 1; i < polygon.length; i++) {
      this.context.lineTo(polygon[i][0], polygon[i][1]);
    }

    this.context.closePath();
    this.context.stroke();
  }
  // TODO - resize dynamically the canvas board
  private setCanvasDimensions(): void {
    if (this.canvas) {
      const canvasContainer = document.getElementById("canvasContainer")!
      this.canvas.width = canvasContainer.getBoundingClientRect().width
      this.canvas.height = canvasContainer.getBoundingClientRect().height;
    }
  }
  private onCanvasClick(point: number[]): void {
    const polygon = this.zoneStoreService.getPolygon()
    if (polygon.length === this.MAX_POINT - 1 && this.isPointNearFirstPoint(point)) {
      polygon.push(polygon[0]);
      this.drawPolygon(polygon);

    } else {
      polygon.push(point);
      this.drawPoint(point);
    }
  }
  private onMouseMove(event: MouseEvent): void {
    const polygon = this.zoneStoreService.getPolygon()
    if (polygon.length && polygon.length < this.MAX_POINT) {
      const point = this.getCanvasCoordinates(event);
      this.clearCanvas();
      this.drawExistingPoints(polygon);
      this.drawTemporaryLine(point);
    }
  }
  private drawExistingPoints(polygon: number[][]): void {
    polygon.forEach((point: number[]) => this.drawPoint(point));
    this.drawLines();
  }

  private drawPoint(point: number[]): void {
    this.context.fillStyle = 'black';
    this.context.beginPath();
    this.context.arc(point[0], point[1], this.configService.getConfig().radiusPoint, 0, 2 * Math.PI);
    this.context.fill();
  }

  private drawTemporaryLine(point: number[]): void {
    this.drawLines();
    const polygon = this.zoneStoreService.getPolygon()
    if (polygon.length > 0) {
      this.context.beginPath();
      this.context.moveTo(polygon[polygon.length - 1][0], polygon[polygon.length - 1][1]);
      this.context.lineTo(point[0], point[1]);
      this.context.stroke();
    }
  }
  private drawLines(): void {
    const polygon = this.zoneStoreService.getPolygon()
    if (polygon.length < 2) return;

    this.context.strokeStyle = 'black';
    this.context.lineWidth = 2;
    this.context.beginPath();
    this.context.moveTo(polygon[0][0], polygon[0][1]);

    for (let i = 1; i < polygon.length; i++) {
      this.context.lineTo(polygon[i][0], polygon[i][1]);
    }

    if (polygon.length === this.MAX_POINT) {
      this.context.lineTo(polygon[0][0], polygon[0][1]);
    }

    this.context.stroke();
  }

  private isPointNearFirstPoint(point: number[]): boolean {
    const polygon = this.zoneStoreService.getPolygon()
    const firstPoint = polygon[0];
    const distance = Math.sqrt(Math.pow(point[0] - firstPoint[0], 2) + Math.pow(point[1] - firstPoint[1], 2));
    return distance <= 2 * this.configService.getConfig().radiusPoint;
  }
  private getCanvasCoordinates(event: MouseEvent): number[] {
    const rect = this.canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top]
  };

}
