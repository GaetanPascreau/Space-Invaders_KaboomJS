const MOVE_SPEED = 200
const INVADER_SPEED = 100
let CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 300
const TIME_LEFT = 30
const BULLET_SPEED = 400

layer(['obj', 'ui'], 'obj')

const maps = [
  [
    '!                     &',
    '!   ^^^^^^^^^^^^^^    &',
    '!   ^^^^^^^^^^^^^^    &',
    '!   ^^^^^^^^^^^^^^    &',
    '!   ^^^^^^^^^^^^^^    &',
    '!                     &',
    '!                     &',
    '!                     &',
    '!                     &',
    '!                     &',
    '!                     &',
    '!                     &',
    '!                     &',
    '!!!!!!!!!!!!!!!!!!!!!!!',
  ],
  [
    '!                     &',
    '!  xxxxxxxxxxxxxxxx   &',
    '!  xxxxxxxxxxxxxxxx   &',
    '!  xxxxxxxxxxxxxxxx   &',
    '!  xxxxxxxxxxxxxxxx   &',
    '!                     &',
    '!                     &',
    '!                     &',
    '!                     &',
    '!                     &',
    '!                     &',
    '!                     &',
    '!                     &',
    '!!!!!!!!!!!!!!!!!!!!!!!',
  ]
]

const levelCfg = {
  width: 30,
  height: 22,
  '^': [sprite('space-invader'), scale(0.7), 'space-invader'],
  'x': [sprite('space-destroyer'), scale(0.9), 'space-invader'],
  '!': [sprite('wall'), 'left-wall', solid()],
  '&': [sprite('wall'), 'right-wall', solid()],
}

const levelIndex = args.level ?? 0

const gameLevel = addLevel(maps[levelIndex], levelCfg)

const scoreGlobal =   args.score ?? 0

const scoreText = add([
  text('score: '),
  pos(400,10),
  layer('ui'),
   scale(2),
])

const scoreLabel = add([
  text(scoreGlobal),
  pos(500,10),
  layer('ui'),
  scale(2),
  {
    value: scoreGlobal,
  }
])

add([
  text('level ' + parseInt(levelIndex + 1)),
  pos(40, 10),
  scale(2)
])

const player = add([
  sprite('space-ship'),
  pos(width()/2, height()/2),
  origin('center'),
  body()
])

keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
})

keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
})

function spawnBullet(p){
  add([
    rect(6,18),
    pos(p),
    origin('center'),
    color(0.5, 0.5, 1),
    'bullet'
  ])
}

keyPress('space', () => {
spawnBullet(player.pos.add(0, -25))
})

action('bullet', (b) => {
  b.move(0, -BULLET_SPEED)
  if (b.pos.y <0) {
    destroy(b)
  }
})

collides('bullet', 'space-invader', (b,s) => {
  camShake(4)
  destroy(b)
  destroy(s)
  scoreLabel.value++
  scoreLabel.text = scoreLabel.value
  if (scoreLabel.value == 56){
    go('main', {
      level: (levelIndex +1) % maps.length,
      score : scoreLabel.value
    })
  }
  if (scoreLabel.value == 120){
    go('win', {
      score: scoreLabel.value
    })
  }
})

const timer = add([
  text('0'),
  pos(200, 10),
  scale(2),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
])

timer.action(() => {
  timer.time -= dt()
  timer.text = timer.time.toFixed(2)
  if (timer.time <=0){
    go('lose', {score: scoreLabel.value})
  }
})

action('space-invader', (s) => {
  s.move(CURRENT_SPEED, 0)
})

collides('space-invader', 'right-wall', () => {
  CURRENT_SPEED = -INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})

collides('space-invader', 'left-wall', () => {
  CURRENT_SPEED = INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})

player.overlaps('space-invader', () => {
  go('lose', {score: scoreLabel.value})
})

action('space-invader', (s) => {
  if (s.pos.y >= (12*22)) {
  //if (s.pos.y >= height() /2) {
      go('lose', {score: scoreLabel.value})
  }
})