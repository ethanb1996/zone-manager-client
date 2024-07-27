import { Injectable } from '@angular/core';
import { Zone } from '../types/zone';
import { filter, fromEvent, map, Subscription, tap } from 'rxjs';

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
  constructor() { }

  public init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas
    this.setCanvasDimensions();
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    const mouseMove$ = fromEvent<MouseEvent>(canvas, 'mousemove').pipe(
      tap(event => this.onMouseMove(event))
    );

    const mouseClick$ = fromEvent<MouseEvent>(canvas, 'click').pipe(
      filter(() => this.points.length < this.maxPoints),
      map(event => this.getCanvasCoordinates(event)),
      tap(point => this.onCanvasClick(point))
    );

    this.subscriptions.add(mouseMove$.subscribe());
    this.subscriptions.add(mouseClick$.subscribe());
  }

  public destroy(){
    this.subscriptions.unsubscribe();
  }
  private setCanvasDimensions(): void {
    if (this.canvas) {
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = this.canvas.offsetWidth * dpr;
      this.canvas.height = this.canvas.offsetHeight * dpr;
      this.context?.scale(dpr, dpr);
    }
  }
  private onCanvasClick(point: number[]): void {
    if (this.points.length === this.maxPoints - 1 && this.isPointNearFirstPoint(point)) {
      this.points.push(this.points[0]);
      this.drawPolygon();
      //The bug is here i don t clean the array of button
    } else {
      this.points.push(point);
      this.drawPoint(point);
    }
  }
  private onMouseMove(event: MouseEvent): void {
    if (this.points.length < this.maxPoints) {
      const point = this.getCanvasCoordinates(event);
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawExistingPoints();
      this.drawTemporaryLine(point);
    }
  }
  private drawExistingPoints(): void {
    for (const point of this.points) {
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
    this.drawLines();
    if (this.points.length > 0) {
      this.context.beginPath();
      this.context.moveTo(this.points[this.points.length - 1][0], this.points[this.points.length - 1][1]);
      this.context.lineTo(point[0], point[1]);
      this.context.stroke();
    }
  }
  private drawLines(): void {
    if (this.points.length < 2) return;

    this.context.strokeStyle = 'black';
    this.context.lineWidth = 2;
    this.context.beginPath();
    this.context.moveTo(this.points[0][0], this.points[0][1]);

    for (let i = 1; i < this.points.length; i++) {
      this.context.lineTo(this.points[i][0], this.points[i][1]);
    }

    if (this.points.length === this.maxPoints) {
      this.context.lineTo(this.points[0][0], this.points[0][1]);
    }

    this.context.stroke();
  }
  private drawPolygon(): void {
    if (this.points.length !== this.maxPoints) return;

    this.context.strokeStyle = 'red';
    this.context.lineWidth = 2;

    this.context.beginPath();
    this.context.moveTo(this.points[0][0], this.points[0][1]);

    for (let i = 1; i < this.points.length; i++) {
      this.context.lineTo(this.points[i][0], this.points[i][1]);
    }

    this.context.closePath();
    this.context.stroke();
  }
  private isPointNearFirstPoint(point: number[]): boolean {
    const firstPoint = this.points[0];
    const distance = Math.sqrt(Math.pow(point[0] - firstPoint[0], 2) + Math.pow(point[1] - firstPoint[1], 2));
    return distance <= 10; // Adjust the threshold as needed
  }
  private getCanvasCoordinates(event: MouseEvent): number[] {
    const rect = this.canvas.getBoundingClientRect();
    return [event.clientX - rect.left,event.clientY - rect.top]
  };
 

  public editZoneOnCanvas(zone: Zone): void {
    const ctx = this.canvas.getContext('2d');

    if (ctx) {
      // Clear the canvas
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw the zone on the canvas based on zone.points or other properties
      ctx.beginPath();
      for (let point of zone.points) {
        ctx.lineTo(point[0], point[1]);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
}
