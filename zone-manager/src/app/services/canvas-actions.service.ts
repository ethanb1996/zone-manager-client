import { Injectable } from '@angular/core';
import { Zone } from '../types/zone';
import { filter, fromEvent, map, Subscription, tap } from 'rxjs';
import { ZoneStoreService } from '../store/zone-store.service';

const MAX_POINT = 4

@Injectable({
  providedIn: 'root'
})
export class CanvasActionsService{

  //TODO - I need to link the selectedZone from the store to the canvas
  private canvas!: HTMLCanvasElement
  private context!: CanvasRenderingContext2D
  private points: number[][] = [];
  private maxPoints = 4;
  private subscriptions: Subscription = new Subscription();
  constructor(private zoneStoreService: ZoneStoreService) { }

  public init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas
    this.setCanvasDimensions();
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    const mouseMove$ = fromEvent<MouseEvent>(canvas, 'mousemove').pipe(
      tap(event => this.onMouseMove(event))
    );

    const mouseClick$ = fromEvent<MouseEvent>(canvas, 'click').pipe(
      filter(() => this.zoneStoreService.getSelectedZoneSnapShot().points.length < MAX_POINT),
      map((event:MouseEvent) => this.getCanvasCoordinates(event)),
      tap((point:number[]) => this.onCanvasClick(point))
    );

    this.subscriptions.add(mouseMove$.subscribe());
    this.subscriptions.add(mouseClick$.subscribe());
  }

  public destroy(){
    this.subscriptions.unsubscribe();
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
    const selectedZone:Zone = this.zoneStoreService.getSelectedZoneSnapShot()
    if (selectedZone.points.length === MAX_POINT && this.isPointNearFirstPoint(point)) {
      // this.points.push(this.points[0]);
      this.zoneStoreService.addPointToSelectedZone(selectedZone.points[0])
      // this.drawPolygon(); <-- change this to draw a zone object
      //The bug is here i don t clean the array of button
    } else {
      // this.points.push(point);
      this.zoneStoreService.addPointToSelectedZone(point)
      this.drawPoint(point);
    }
  }
  private onMouseMove(event: MouseEvent): void {
    const selectedZone:Zone = this.zoneStoreService.getSelectedZoneSnapShot()
    if (selectedZone.points.length < MAX_POINT) {
      const point = this.getCanvasCoordinates(event);
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawExistingPoints();
      this.drawTemporaryLine(point);
    }
  }
  private drawExistingPoints(): void {
    const selectedZone:Zone = this.zoneStoreService.getSelectedZoneSnapShot()
    for (const point of selectedZone.points) {
      this.drawPoint(point);
    }
    this.drawLines();
  }
  private drawPoint(point: number[]): void {
    this.context.fillStyle = 'black';
    this.context.beginPath();
    this.context.arc(point[0], point[1], 5, 0, 2 * Math.PI);
    this.context.fill();
  }
  private drawTemporaryLine(point: number[]): void {
    const selectedZone:Zone = this.zoneStoreService.getSelectedZoneSnapShot()
    this.drawLines();
    if (selectedZone.points.length > 0) {
      this.context.beginPath();
      this.context.moveTo(selectedZone.points[selectedZone.points.length - 1][0], selectedZone.points[selectedZone.points.length - 1][1]);
      this.context.lineTo(point[0], point[1]);
      this.context.stroke();
    }
  }
  private drawLines(): void {
    const selectedZone:Zone = this.zoneStoreService.getSelectedZoneSnapShot()
    if (selectedZone.points.length < 2) return;

    this.context.strokeStyle = 'black';
    this.context.lineWidth = 2;
    this.context.beginPath();
    this.context.moveTo(selectedZone.points[0][0], selectedZone.points[0][1]);

    for (let i = 1; i < selectedZone.points.length; i++) {
      this.context.lineTo(selectedZone.points[i][0], selectedZone.points[i][1]);
    }

    if (selectedZone.points.length === MAX_POINT) {
      this.context.lineTo(selectedZone.points[0][0], selectedZone.points[0][1]);
    }

    this.context.stroke();
  }
  public drawPolygon(zone:Zone = {} as Zone): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (zone.points.length !== MAX_POINT) return;

    this.context.strokeStyle = 'red';
    this.context.lineWidth = 2;

    this.context.beginPath();
    this.context.moveTo(zone.points[0][0], zone.points[0][1]);

    for (let i = 1; i < zone.points.length; i++) {
      this.context.lineTo(zone.points[i][0], zone.points[i][1]);
    }

    this.context.closePath();
    this.context.stroke();
  }
  private isPointNearFirstPoint(point: number[]): boolean {
    const selectedZone:Zone = this.zoneStoreService.getSelectedZoneSnapShot()
    const firstPoint = selectedZone.points[0];
    const distance = Math.sqrt(Math.pow(point[0] - firstPoint[0], 2) + Math.pow(point[1] - firstPoint[1], 2));
    return distance <= 10; // Adjust the threshold as needed
  }
  private getCanvasCoordinates(event: MouseEvent): number[] {
    const rect = this.canvas.getBoundingClientRect();
    return [event.clientX - rect.left,event.clientY - rect.top]
  };

}
