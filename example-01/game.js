(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  
  var debugRefresh = 400

  var deltaTime  = 0
  var timeElapse = 0

  var _seg = 0
  var _fps = 0

  var mousex = 0
  var mousey = 0

  var stage = null
  var buttonPlay = null
  var mouse = null
  var spritePlay = null
  var spritePlayHover = null

  function init(){
    stage = new DEVGAME.Container()
    buttonPlay = new DEVGAME.Container()
    buttonPlay.setContext(context)
    stage.setContext(context)

    spritePlay = new DEVGAME.Sprite({
      source:  'sprite.png', 
      swidth:  162,
      sheight: 54,
    });

    spritePlayHover = new DEVGAME.Sprite({
      source:  'sprite2.png', 
      swidth:  162,
      sheight: 54,
    });

    mouse = new DEVGAME.entity.Circle(mousex, mousey, 5)
    mouse.visible = false

    buttonPlay = new DEVGAME.entity.Rect(300, 250, 120, 30)
    
    mouse.logic = function(){
      this.x = mousex
      this.y = mousey
      if (this.getX() < 0){
        this.x = 0
      }
      if (this.getX() > canvas.clientWidth){
        this.x = canvas.clientWidth
      }
      if (this.getY() < 0){
        this.y = 0
      }
      if (this.getY() > canvas.clientHeight){
        this.y = canvas.clientHeight
      }
    }

    buttonPlay.logic = function() {
      if (this.collisionCircle(mouse)){
        buttonPlay.setSprite(spritePlayHover)
      }else {
        buttonPlay.setSprite(spritePlay)
      }
    }

    spritePlay.load(function(error){
      events()
      run(loop)
    })

    buttonPlay.setSprite(spritePlay)

    stage.add(mouse, buttonPlay)
  }

  function exec(timestamp){
    timeElapse = timeElapse === 0 ? timestamp : timeElapse
    
    deltaTime  = timestamp - timeElapse
    timeElapse = timestamp

    _seg += deltaTime

    //debug refresh
    if (_seg >= debugRefresh){
      
      _fps = (1/deltaTime)*1000
      _seg = 0
    }
    
    if (deltaTime > 17){
      deltaTime = 0
    }

    stage.exec()
  }

  function draw(){
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    stage.render()
    context.fillStyle = '#000'
    context.font      = 'normal 16pt Arial'
    context.fillText('hecho por: jsstoni', 20, 20)
  }

  function events(){
    document.addEventListener('mousemove', function(event){
      mousex = event.pageX - canvas.offsetLeft
      mousey = event.pageY - canvas.offsetTop
    }, false)
  }

  function loop(timestamp){
    exec(timestamp)
    draw()

    run(loop)

  }

  var run = DEVGAME.requestAnimationFrame(loop)
  window.addEventListener('load', init, false)



})(window, document, DEVGAME)
