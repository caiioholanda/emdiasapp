import { Component, ViewChild, Renderer2 } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AnimationController, Animation, Platform, Gesture, GestureController  } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  @ViewChild('blocks')   blocks:any
  @ViewChild('background')   background:any
  @ViewChild('swipeDown')   swipeDown:any

  public options: Array<any> = [
    { icon: 'person-add-outline', text: 'Clientes ativos'} ,
    { icon: 'lock-open-outline', text: 'Clientes bloquados'} ,
    { icon: 'person-add-outline', text: 'Clientes testando'} ,
    { icon: 'options-outline', text: 'Bloquear Cliente'} 
  ];

  public slidesOptions:any = { slidesPerView: 3, freeMode: true };

  public items: Array<any> = [
   { icon: 'help-circle-outline', text: 'Me ajuda'},
   { icon: 'person-outline', text: 'Perfil'},
   { icon: 'cash-outline', text: 'Configurar conta'},
   { icon: 'card-outline', text: 'Configurar cartão'},
   { icon: 'phone-portrait-outline', text: 'Configurações do app'}
  ];


  public initialStep: number = 0;
  private maxTranslate: number;
  private animation: Animation;
  private gesture: Gesture;
  private swiping: boolean = false;


  constructor
      (
          private render: Renderer2, 
          private apiService: ApiService, 
          private animationCtrl: AnimationController, 
          private platform: Platform,
          private gestureCtrl: GestureController
      ) {
    this.maxTranslate = this.platform.height() - 200;
    this.readData();
    // this.updateData();
    // this.deleteData();
  }



  ngAfterViewInit() {
    this.createAnimation();
    this.detectSwipe();
  }


  detectSwipe() {
    this.gesture = this.gestureCtrl.create({
      el: this.swipeDown.el,
      gestureName: 'swipe-down',
      threshold: 0,
      onMove: ev => this.onMove(ev),
      onEnd: ev => this.onEnd(ev)
    }, true);

    this.gesture.enable(true);
  }


  onMove(ev) {

    if(!this.swiping) {
      this.animation.direction('normal').progressStart(true);
      this.swiping = true;
    }


    const step: number = this.getStep(ev);

    this.animation.progressStep(step);
    this.setBackgroundOpacity(step);

  }

  onEnd(ev) {

    if(!this.swiping) return;


    this.gesture.enable(false);
    const step: number = this.getStep(ev);
    const shouldComplete: boolean = step > 0.5;


    this.animation.progressEnd(shouldComplete ? 1  : 0, step);  

    this.initialStep  = shouldComplete ? this.maxTranslate : 0;

    this.setBackgroundOpacity();

    this.swiping = false;

  }

  getStep(ev): number {

    const delta:number = this.initialStep + ev.deltaY;

    return delta / this.maxTranslate;

  }


  toggleBlocks() {

    this.initialStep = this.initialStep ===  0 ? this.maxTranslate : 0;

    this.gesture.enable(false);

    this.animation.direction(this.initialStep === 0 ? 'reverse' : 'normal').play();

    this.setBackgroundOpacity();
  }


  createAnimation() {
    this.animation = this.animationCtrl.create()
    .addElement(this.blocks.nativeElement)
    .duration(300)
    .fromTo('transform', 'translateY(0)', `translateY(${this.maxTranslate}px)`)
    .onFinish(() => this.gesture.enable(true));
  }

  readData(){
    this.apiService.readData().subscribe(data => {
      console.log(data);
    });
  }

  setBackgroundOpacity(value:number = null) {
    this.render.setStyle(this.background.nativeElement, 'opacity', value ? value : this.initialStep === 0 ? '0' : '1');
  }

  fixedBlocks() : boolean {
    return   this.swiping || this.initialStep === this.maxTranslate;
  }

}
