import { gsap, Back, GSAPTimeline } from 'gsap'
import './move.css'
interface options {
  target: HTMLElement
  [key: string]: any
}

export class myAnimation {
  // tl: GSAPTimeline
  element: HTMLElement
  active = false
  cancel: HTMLElement

  constructor(public option: options) {
    this.element = this.option.target
    this.option.target.addEventListener('click', this.add.bind(this))
    this.init(option)
  }
  init(option: options) {
    option.oldleft = this.element.offsetLeft
    option.oldtop = this.element.offsetTop
    option.oldwidth = this.element.style.width
    option.oldheight = this.element.style.height
    const that = this
    let cancel = document.createElement('span')
    cancel.addEventListener('click', function (e) {
      e.stopPropagation()
      that.moveBack()
    })
    cancel.innerHTML = 'X'
    cancel.style.cssText = 'display: none'
    this.element.appendChild(cancel)
    this.cancel = cancel
  }
  add() {
    this.cancel.style.cssText = 'display: block'
    if (!this.active) {
      // const position = this.getPosition2(this.option)
      // this.element.style.cssText = `left: ${position.x}px;top: ${position.y}px;width: ${this.option.width}px;height: ${this.option.height}px`

      const tl: GSAPTimeline = gsap.timeline({ paused: true })
      const element = this.element
      //   'position: relative;width: 100%;height: 100%;top: 0;left: 0;background-color: transparent;'
      // tl.set(selfcontent, { left: selfcontent.offsetLeft, top: selfcontent.offsetTop })
      const move = this.getPosition(element, this.option)
      // parent.style.cssText = `position: fixed;top: ${parent.offsetTop};left: ${parent.offsetLeft}`
      element.style.cssText = `z-index: 99`
      tl.to(element, 1, {
        x: move.x,
        y: move.y,
        ease: Back.easeInOut,
      })
        .to(
          element,
          1,
          { width: this.option.width, height: this.option.height },
          '-0.3'
        )
        .set(this.element, {
          left: window.innerWidth / 2,
          top: window.innerHeight / 2,
          x: -this.option.width / 2,
          y: -this.option.height / 2,
        })
      tl.play()
      this.active = true
    }
    // selfcontent.style.cssText = `transform: translate(${move.x}px,${move.y}px);width: ${option.width}px;height: ${option.height}px`
  }
  moveBack() {
    if (this.active) {
      this.cancel.style.cssText = 'display: none'
      // this.element.style.cssText = `left: ${this.option.x}px;top: ${this.option.y}px`
      const tl: GSAPTimeline = gsap.timeline({ paused: true })
      // const move = this.getOldPostion()
      // parent.style.cssText = `position: fixed;top: ${parent.offsetTop};left: ${parent.offsetLeft}`
      // tl.to(
      //   this.element,
      //   1,
      //   { width: this.option.oldwidth, height: this.option.oldheight },
      //   '-0.3'
      // )
      //   .to(this.element, 1, {
      //     left: this.option.oldleft,
      //     top: this.option.oldtop,
      //     ease: Back.easeInOut,
      //   })
      tl.set(this.element, {
        x: 0,
        y: 0,
        width: this.option.oldwidth,
        height: this.option.oldheight,
      })
      // tl.play()
      this.element.style.cssText = ''
      this.active = false
    }
    // this.tl.reverse()
  }
  getPosition(selfcontent: HTMLElement, option: options) {
    const mYx =
      window.innerWidth / 2 - selfcontent.offsetLeft - option.width / 2
    const mYy =
      window.innerHeight / 2 - selfcontent.offsetTop - option.height / 2
    return {
      x: mYx,
      y: mYy,
    }
  }
  getPosition2(option: options) {
    const mYx = window.innerWidth / 2 - option.width / 2
    const mYy = window.innerHeight / 2 - option.height / 2
    return {
      x: mYx,
      y: mYy,
    }
  }
  getOldPostion() {
    const mYx =
      window.innerWidth / 2 - this.option.oldleft - this.option.oldwidth / 2
    const mYy =
      window.innerHeight / 2 - this.option.oldtop - this.option.oldheight / 2
    console.log(mYx, mYy)
    return {
      x: mYx,
      y: -mYy,
    }
  }
  setOptions(width: number, height: number) {
    this.option.width = width
    this.option.height = height
  }
}

export default class moveAction {
  arrayMove: any[] = []
  constructor(option: options) {
    const children = [].slice.call(option.target)
    // delete option.target
    for (const value of children) {
      this.arrayMove.push(
        new myAnimation(
          Object.assign(option, {
            target: value,
          })
        )
      )
    }
  }
  removeAll() {
    for (let myMove of this.arrayMove) {
      myMove.moveBack()
    }
  }
  setOptions(width: number, height: number) {
    for (let myMove of this.arrayMove) {
      myMove.setOptions(width, height)
    }
  }
}
