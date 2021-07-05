
  if(args.score <= 28){
    add([
      text('You\'re way off !\n Stay focused !'),
      origin('center'),
      scale(4),
      pos(width()/2, height()/4)
    ])
  } else if (args.score <= 42){
    add([
      text('You can do better !\n Try again !'),
      origin('center'),
      scale(4),
      pos(width()/2, height()/4)
    ])
  } else if (args.score < 56) {
    add([
      text('You\'re almost there !\n One more effort !'),
      origin('center'),
      scale(4),
      pos(width()/2, height()/4)
    ])
  } else if (args.score <= 88) {
    add([
      text('You\'re way off !\n Stay focused !'),
      origin('center'),
      scale(4),
      pos(width()/2, height()/4)
    ])
  } else if (args.score <= 104) {
    add([
      text('You can do better !\n Try again !'),
      origin('center'),
      scale(4),
      pos(width()/2, height()/4)
    ])
  } else if (args.score < 120) {
    add([
      text('You\'re almost there !\n One more effort !'),
      origin('center'),
      scale(4),
      pos(width()/2, height()/4)
    ])
  } 

add([
  text('your score: ' + args.score),
  origin('center'),
  scale(4),
  pos(width()/2, height()/2)
])