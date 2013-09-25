var Direction = require('../tiles').Direction;

//TODO: Fix hacky level-number-dependent toolbox.
var toolbox = function(page, level) {
  return mazepage.toolbox({}, null, {
    page: page,
    level: level
  });
};

/*
 * Configuration for all levels.
 */
module.exports = {

  // Formerly page 1

  '1_1': {
    'instructions': 'instructions1_1',
    'toolbox': toolbox(1, 1),
    'interstitials': {
      before: {
        message: 'reinfMsg1',
        videoId: '0BybP3F7DhXrUSFRhMnBGLUVPZTA'
      }
    },
    'ideal': 2,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}]
    ],
    'scale': {
      'snapRadius': 2,
      'stepSpeed': 12
    },
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 1, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    'singleTopBlock': true
  },
  '1_2': {
    'instructions': 'instructions1_2',
    'toolbox': toolbox(1, 2),
    'interstitials': {
      after: {
        message: 'reinfMsg3',
        images: ['maze/dirs.png', 'maze/dirs2.png'],
        blocks: '%3Cblock%20type%3D%22maze_turn%22%20x%3D%2226%22%20y%3D%2222%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnLeft%3C%2Ftitle%3E%3Cnext%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnLeft%3C%2Ftitle%3E%3Cnext%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnRight%3C%2Ftitle%3E%3Cnext%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnLeft%3C%2Ftitle%3E%3C%2Fblock%3E%3C%2Fnext%3E%3C%2Fblock%3E%3C%2Fnext%3E%3C%2Fblock%3E%3C%2Fnext%3E%3C%2Fblock%3E'
      }
    },
    'ideal': 5,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}}],
      [{'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}}]
    ],
    'scale': {
      'stepSpeed': 10
    },
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 3, 0, 0, 0],
      [0, 0, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    'singleTopBlock': true
  },
  '1_3': {
    'instructions': 'instructions1_3',
    'toolbox': toolbox(1, 3),
    'interstitials': {
      before: {
        message: 'reinfMsg2',
        videoId: '0BybP3F7DhXrUU2FCODdJdXRKVTQ',
        blocks: '%3Cblock%20type%3D%22maze_forever%22%20x%3D%2220%22%20y%3D%2222%22%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_moveForward%22%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E'
      }
    },
    'ideal': 2,
    'requiredBlocks': [
      [{'test': 'while', 'type': 'maze_forever'}],
      [{'test': 'moveForward', 'type': 'maze_moveForward'}]
    ],
    'scale': {
      'stepSpeed': 8
    },
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '1_4': {
    'instructions': 'instructions1_4',
    'toolbox': toolbox(1, 4),
    'ideal': 5,
    'requiredBlocks': [
      [{'test': 'while', 'type': 'maze_forever'}],
      [{'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}}],
      [{'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}}],
      [{'test': 'moveForward', 'type': 'maze_moveForward'}]
    ],
    'scale': {
      'stepSpeed': 6
    },
    'startDirection': Direction.EAST,
    /**
     *  Note, the path continues past the start and the goal in both directions.
     *  This is intentional so kids see the maze is about getting from the start
     *  to the finish and not necessarily about moving over every part of the maze,
     *  'mowing the lawn' as Neil calls it.
     */
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 3, 0],
      [0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 2, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0]
    ]
  },
  '1_5': {
    'instructions': 'instructions1_5',
    'toolbox': toolbox(1, 5),
    'interstitials': {
      before: {
        message: 'reinfMsg4',
        videoId: '0BybP3F7DhXrUSFRhMnBGLUVPZTA',
        blocks: '%3Cblock%20type%3D%22maze_if%22%20x%3D%2215%22%20y%3D%2214%22%3E%3Ctitle%20name%3D%22DIR%22%3EisPathLeft%3C%2Ftitle%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnLeft%3C%2Ftitle%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E'
      },
      after: {
        message: 'reinfMsg5',
        images: ['maze/repeat_block2.png'],
        blocks: '%3Cblock%20type%3D%22maze_forever%22%20x%3D%2210%22%20y%3D%2212%22%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_if%22%3E%3Ctitle%20name%3D%22DIR%22%3EisPathRight%3C%2Ftitle%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnRight%3C%2Ftitle%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3Cnext%3E%3Cblock%20type%3D%22maze_moveForward%22%3E%3C%2Fblock%3E%3C%2Fnext%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E'
      }
    },
    'ideal': 4,
    'requiredBlocks': [
      [{'test': 'while', 'type': 'maze_forever'}],
      [{'test': 'isPathLeft', 'type': 'maze_if', 'titles': {'DIR': 'isPathLeft'}}],
      [{'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}}],
      [{'test': 'moveForward', 'type': 'maze_moveForward'}]
    ],
    'scale': {
      'stepSpeed': 6
    },
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 2, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '1_6': {
    'instructions': 'instructions1_6',
    'toolbox': toolbox(1, 6),
    'interstitials': {
      before: {
        message: 'reinfMsg6'
      }
    },
    'ideal': 4,
    'requiredBlocks': [
      [{'test': 'while', 'type': 'maze_forever'}],
      [{'test': 'isPathLeft', 'type': 'maze_if', 'titles': {'DIR': 'isPathLeft'}}],
      [{'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}}],
      [{'test': 'moveForward', 'type': 'maze_moveForward'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 3, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 2, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '1_7': {
    'instructions': 'instructions1_7',
    'toolbox': toolbox(1, 7),
    'ideal': 4,
    'requiredBlocks': [
      [{'test': 'while', 'type': 'maze_forever'}],
      [{'test': 'isPathRight', 'type': 'maze_if', 'titles': {'DIR': 'isPathRight'}}],
      [{'test': 'moveForward', 'type': 'maze_moveForward'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 3, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '1_8': {
    'instructions': 'instructions1_8',
    'toolbox': toolbox(1, 8),
    'ideal': 6,
    'requiredBlocks': [
      [{'test': 'while', 'type': 'maze_forever'}],
      [{'test': 'isPathRight', 'type': 'maze_if', 'titles': {'DIR': 'isPathRight'}}],
      [{'test': 'isPathLeft', 'type': 'maze_if', 'titles': {'DIR': 'isPathLeft'}}],
      [{'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}}],
      [{'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}}],
      [{'test': 'moveForward', 'type': 'maze_moveForward'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0],
      [0, 2, 1, 1, 0, 3, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '1_9': {
    'instructions': 'instructions1_9',
    'toolbox': toolbox(1, 9),
    'interstitials': {
      before: {
        message: 'reinfMsg8',
        blocks: '%3Cblock%20type%3D%22maze_ifElse%22%20x%3D%226%22%20y%3D%2216%22%3E%3Ctitle%20name%3D%22DIR%22%3EisPathForward%3C%2Ftitle%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_moveForward%22%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3Cstatement%20name%3D%22ELSE%22%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnLeft%3C%2Ftitle%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E'
      },
      after: {
        message: 'reinfMsg9',
        images: ['maze/ifelse.png'],
        blocks: '%3Cblock%20type%3D%22maze_ifElse%22%20x%3D%2222%22%20y%3D%2221%22%3E%3Ctitle%20name%3D%22DIR%22%3EisPathForward%3C%2Ftitle%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_moveForward%22%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3Cstatement%20name%3D%22ELSE%22%3E%3Cblock%20type%3D%22maze_ifElse%22%3E%3Ctitle%20name%3D%22DIR%22%3EisPathLeft%3C%2Ftitle%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnLeft%3C%2Ftitle%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3Cstatement%20name%3D%22ELSE%22%3E%3Cblock%20type%3D%22maze_if%22%3E%3Ctitle%20name%3D%22DIR%22%3EisPathRight%3C%2Ftitle%3E%3Cstatement%20name%3D%22DO%22%3E%3Cblock%20type%3D%22maze_turn%22%3E%3Ctitle%20name%3D%22DIR%22%3EturnRight%3C%2Ftitle%3E%3Cnext%3E%3Cblock%20type%3D%22maze_moveForward%22%3E%3C%2Fblock%3E%3C%2Fnext%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E'
      }
    },
    'ideal': 6,
    'requiredBlocks': [
      [{'test': 'while', 'type': 'maze_forever'}],
      [{'test': 'isPathForward', 'type': 'maze_ifElse',
                                'titles': {'DIR': 'isPathForward'}}],
      [{'test': 'turnLeft', 'type': 'maze_turn', 'titles': {'DIR': 'turnLeft'}}],
      [{'test': 'moveForward', 'type': 'maze_moveForward'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [3, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 2, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '1_10': {
    'instructions': 'instructions1_10',
    'toolbox': toolbox(1, 10),
    'ideal': 5,
    'requiredBlocks': [
      [{'test': 'while', 'type': 'maze_forever'}],
      [{'test': 'isPathForward', 'type': 'maze_ifElse',
                                'titles': {'DIR': 'isPathForward'}}],
      [{'test': 'turnRight', 'type': 'maze_turn', 'titles': {'DIR': 'turnRight'}}],
      [{'test': 'moveForward', 'type': 'maze_moveForward'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 1, 1, 0],
      [0, 1, 3, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },

  // Formerly Page 2

  '2_1': {
    'instructions': 'instructions2_1',
    'toolbox': toolbox(2, 1),
    'ideal': 2,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 1, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '2_2': {
    'instructions': 'instructions2_2',
    'toolbox': toolbox(2, 2),
    'ideal': 3,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 1, 1, 3, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '2_3': {
    'instructions': 'instructions2_3',
    'toolbox': toolbox(2, 3),
    'ideal': 5,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'turnLeft',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnLeft'}}],
      [{'test': 'turnRight',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnRight'}}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 4, 1, 3, 0, 0, 0],
      [0, 0, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '2_4': {
    'instructions': 'instructions2_4',
    'toolbox': toolbox(2, 4),
    'ideal': 7,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'turnLeft',
       'type': 'maze_turn',
       'titles': {'DIR': 'turnLeft'}}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 4, 3, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '2_5': {
    'instructions': 'instructions2_5',
    'toolbox': toolbox(2, 5),
    'ideal': 2,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'for', 'type': 'controls_repeat'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '2_6': {
    'instructions': 'instructions2_6',
    'toolbox': toolbox(2, 6),
    'ideal': 3,
    'requiredBlocks': [
      [{'test': 'turnRight',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnRight'}}],
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'for', 'type': 'controls_repeat'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 3, 0, 0, 0]
    ]
  },
  '2_7': {
    'instructions': 'instructions2_7',
    'toolbox': toolbox(2, 7),
    'ideal': 5,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'for', 'type': 'controls_repeat'}],
      [{'test': 'turnLeft',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnLeft'}}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 2, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '2_8': {
    'instructions': 'instructions2_8',
    'toolbox': toolbox(2, 8),
    'ideal': 5,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'for', 'type': 'controls_repeat'}],
      [{'test': 'turnRight',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnRight'}}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '2_9': {
    'instructions': 'instructions2_9',
    'toolbox': toolbox(2, 9),
    'ideal': 2,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'while', 'type': 'maze_forever'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '2_10': {
    'instructions': 'instructions2_10',
    'toolbox': toolbox(2, 10),
    'ideal': 3,
    'requiredBlocks': [
      [{'test': 'turnRight',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnRight'}}],
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'while', 'type': 'maze_forever'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 3, 0, 0, 0]
    ]
  },
  '2_11': {
    'instructions': 'instructions2_11',
    'toolbox': toolbox(2, 11),
    'ideal': 5,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'while', 'type': 'maze_forever'}],
      [{'test': 'turnLeft',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnLeft'}}],
      [{'test': 'turnRight',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnRight'}}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 3, 0],
      [0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 2, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0]
    ]
  },
  '2_12': {
    'instructions': 'instructions2_12',
    'toolbox': toolbox(2, 12),
    'ideal': 5,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'while', 'type': 'maze_forever'}],
      [{'test': 'turnLeft',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnLeft'}}],
      [{'test': 'turnRight',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnRight'}}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 2, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 3, 0],
      [0, 0, 0, 0, 0, 0, 1, 1]
    ]
  },
  '2_13': {
    'instructions': 'instructions2_13',
    'toolbox': toolbox(2, 13),
    'ideal': 4,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'turnLeft',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnLeft'}}],
      [{'test': 'isPathLeft',
        'type': 'maze_if',
        'titles': {'DIR': 'isPathLeft'}}],
      [{'test': 'while', 'type': 'maze_forever'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 2, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 4, 0, 0]
    ]
  },
  '2_14': {
    'instructions': 'instructions2_14',
    'toolbox': toolbox(2, 14),
    'ideal': 4,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'turnRight',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnRight'}}],
      [{'test': 'isPathRight',
        'type': 'maze_if',
        'titles': {'DIR': 'isPathRight'}}],
      [{'test': 'while', 'type': 'maze_forever'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 4, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 3, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '2_15': {
    'instructions': 'instructions2_15',
    'toolbox': toolbox(2, 15),
    'ideal': 4,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'turnRight',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnRight'}}],
      [{'test': 'isPathRight',
        'type': 'maze_if',
        'titles': {'DIR': 'isPathRight'}}],
      [{'test': 'while', 'type': 'maze_forever'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 3, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 4, 0, 0, 0]
    ]
  },
  '2_16': {
    'instructions': 'instructions2_16',
    'toolbox': toolbox(2, 16),
    'ideal': 4,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'turnRight',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnRight'}}],
      [{'test': 'isPathRight',
        'type': 'maze_if',
        'titles': {'DIR': 'isPathRight'}}],
      [{'test': 'while', 'type': 'maze_forever'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 4, 0],
      [0, 1, 1, 3, 0, 1, 1, 0],
      [0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 4, 1],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '2_17': {
    'instructions': 'instructions2_17',
    'toolbox': toolbox(2, 17),
    'ideal': 6,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'isPathForward',
        'type': 'maze_ifElse',
        'titles': {'DIR': 'isPathForward'}}],
      [{'test': 'turnLeft',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnLeft'}}],
      [{'test': 'while', 'type': 'maze_forever'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [3, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 1, 0, 1, 1, 0],
      [1, 1, 1, 4, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 2, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  '2_18': {
    'instructions': 'instructions2_18',
    'toolbox': toolbox(2, 18),
    'ideal': 5,
    'requiredBlocks': [
      [{'test': 'moveForward', 'type': 'maze_moveForward'}],
      [{'test': 'isPathForward',
        'type': 'maze_ifElse',
        'titles': {'DIR': 'isPathForward'}}],
      [{'test': 'turnRight',
        'type': 'maze_turn',
        'titles': {'DIR': 'turnRight'}}],
      [{'test': 'while', 'type': 'maze_forever'}]
    ],
    'startDirection': Direction.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 4, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 1, 1, 0],
      [0, 1, 3, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }
};