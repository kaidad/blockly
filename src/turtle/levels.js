var levelBase = require('../level_base');
var Colours = require('./core').Colours;
var answer = require('./answers').answer;
var msg = require('../../locale/current/turtle');

//TODO: Fix hacky level-number-dependent toolbox.
var toolbox = function(page, level) {
  return require('./toolbox.xml')({
    page: page,
    level: level
  });
};

//TODO: Fix hacky level-number-dependent startBlocks.
var startBlocks = function(page, level) {
  return require('./startBlocks.xml')({
    page: page,
    level: level
  });
};

/**
 * Sets BlocklyApp constants that depend on the page and level.
 * This encapsulates many functions used for BlocklyApps.REQUIRED_BLOCKS.
 * In the future, some of these may be moved to common.js.
 */

// The internal functions are used within BlocklyApps.REQUIRED_BLOCKS.
// I've included jsdoc for some that I think would be good candidates
// for moving to common.js.

/**
 * Create the textual XML for a math_number block.
 * @param {number|string} number The numeric amount, expressed as a
 *     number or string.  Non-numeric strings may also be specified,
 *     such as '???'.
 * @return {string} The textual representation of a math_number block.
 */
var makeMathNumber = function(number) {
    return '<block type="math_number"><title name="NUM">' +
          number + '</title></block>';
};

/**
 * Generate a required blocks dictionary for a simple block that does not
 * have any parameters or values.
 * @param {string} block_type The block type.
 * @return {Object} A required blocks dictionary able to check for and
 *     generate the specified block.
 */
var simpleBlock = function(block_type) {
  return {test: function(block) {return block.type == block_type; },
          type: block_type};
};

/**
 * Generate a required blocks dictionary for a repeat loop.  This does not
 * test for the specified repeat count but includes it in the suggested block.
 * @param {number|string} count The suggested repeat count.
 * @return {Object} A required blocks dictionary able to check for and
 *     generate the specified block.
 */
var repeat = function(count) {
  // This checks for a controls_repeat block rather than looking for 'for',
  // since the latter may be generated by Turtle 2's draw_a_square.
  return {test: function(block) {return block.type == 'controls_repeat';},
          type: 'controls_repeat', titles: {'TIMES': count}};
};

// The remaining internal functions are specific to Turtle.

// This tests for and creates a draw_a_square block on page 2.
function drawASquare(number) {
  return {test: 'draw_a_square',
          type: 'draw_a_square',
          values: {'VALUE': makeMathNumber(number)}};
}

// This tests for and creates a draw_a_snowman block on page 2.
function drawASnowman(number) {
  return {test: 'draw_a_snowman',
          type: 'draw_a_snowman',
          values: {'VALUE': makeMathNumber(number)}};
}

// This tests for and creates the limited "move forward" block used on the
// earlier levels of the tutorial.
var MOVE_FORWARD_INLINE = {test: 'moveForward', type: 'draw_move_by_constant'};

// This tests for and creates the limited "move forward" block used on the
// earlier levels of the tutorial with the given pixel number.
var moveForwardInline = function(pixels) {
  return {test: 'moveForward',
          type: 'draw_move_by_constant',
          titles: {'VALUE': pixels}};
};

// This tests for and creates the limited "move forward" block used on the
// earlier levels of the tutorial.
var MOVE_BACKWARD_INLINE = {test: 'moveBackward',
                            type: 'draw_move_by_constant',
                            titles: {'DIR': 'moveBackward'}};

// This tests for and creates a [right] draw_turn_by_constant_restricted block
// with the specified number of degrees as its input.  The restricted turn
// is used on the earlier levels of the tutorial.
var turnRightRestricted = function(degrees) {
  return {test: 'turnRight(' + degrees,
          type: 'draw_turn_by_constant_restricted',
          titles: {'VALUE': degrees}};
};

// This tests for and creates a [right] draw_turn block with the specified
// number of degrees as its input.  For the earliest levels, the method
// turnRightRestricted should be used instead.
var turnRight = function(degrees) {
  return {
    test: function(block) {
      return block.type == 'draw_turn' &&
          Blockly.JavaScript.valueToCode(
            block, 'VALUE', Blockly.JavaScript.ORDER_NONE) == degrees;
    },
    type: 'draw_turn',
    values: {'VALUE': makeMathNumber(degrees)}};
};

// This tests for and creates a left draw_turn block with the specified
// number of degrees as its input.  This method is not appropriate for the
// earliest levels of the tutorial, which do not provide draw_turn.
var turnLeft = function(degrees) {
  return {test: function(block) {
    return block.type == 'draw_turn' &&
        block.getTitleValue('DIR') == 'turnLeft'; },
          type: 'draw_turn',
          titles: {'DIR': 'turnLeft'},
          values: {'VALUE': makeMathNumber(degrees)}};
};

// This tests for any draw_move block and, if not present, creates
// one with the specified distance.
var move = function(distance) {
  return {test: function(block) {return block.type == 'draw_move'; },
          type: 'draw_move',
          values: {'VALUE': makeMathNumber(distance)}};
};

// This tests for and creates a draw_turn_by_constant_restricted block.
var drawTurnRestricted = function(degrees) {
  return {
    test: function(block) {
      return block.type == 'draw_turn_by_constant_restricted';
    },
    type: 'draw_turn_by_constant_restricted',
    titles: {'VALUE': degrees}
  };
};

// This tests for and creates a draw_turn block.
var drawTurn = function() {
  return {
    test: function(block) {
      return block.type == 'draw_turn';
    },
    type: 'draw_turn'
  };
};

// This tests for and creates a "set colour" block with a colour picker
// as its input.
var SET_COLOUR_PICKER = {test: 'penColour(\'#',
  type: 'draw_colour',
  values: {'COLOUR': '<block type="colour_picker"></block>'}};

// This tests for and creates a "set colour" block with a random colour
// generator as its input.
var SET_COLOUR_RANDOM = {test: 'penColour(colour_random',
  type: 'draw_colour',
  values: {'COLOUR': '<block type="colour_random"></block>'}};

/**
 * Creates a required block specification for defining a function with an
 * argument.  Unlike the other functions to create required blocks, this
 * is defined outside of Turtle.setBlocklyAppConstants because it is accessed
 * when checking for a procedure on levels 8-9 of Turtle 3.
 * @param {string} func_name The name of the function.
 * @param {string} arg_name The name of the single argument.
 * @return A required block specification that tests for a call of the
 *     specified function with the specified argument name.  If not present,
 *     this contains the information to create such a block for display.
 */
var defineWithArg = function(func_name, arg_name) {
  return {
    test: function(block) {
      return block.type == 'procedures_defnoreturn' &&
          block.getTitleValue('NAME') == func_name &&
          block.arguments_ && block.arguments_.length &&
          block.arguments_[0] == arg_name;
    },
    type: 'procedures_defnoreturn',
    titles: {'NAME': func_name},
    extra: '<mutation><arg name="' + arg_name + '"></arg></mutation>'
  };
};

/**
 * Information about level-specific requirements.
 */
module.exports = {
  // Level 1: El.
  '1_1': {
    answer: answer(1, 1),
    ideal: 3,
    toolbox: toolbox(1, 1),
    startBlocks: startBlocks(1, 1),
    requiredBlocks: [[MOVE_FORWARD_INLINE], [turnRightRestricted(90)]],
    freePlay: false
  },
  // Level 2: Square (without repeat).
  '1_2': {
    answer: answer(1, 2),
    ideal: 10,
    toolbox: toolbox(1, 2),
    startBlocks: startBlocks(1, 2),
    requiredBlocks: [
      [MOVE_FORWARD_INLINE],
      [turnRightRestricted(90)]
    ],
    freePlay: false
  },
  // Level 3: Square (with repeat).
  '1_3': {
    answer: answer(1, 3),
    ideal: 3,
    toolbox: toolbox(1, 3),
    startBlocks: startBlocks(1, 3),
    requiredBlocks: [
      [MOVE_FORWARD_INLINE],
      [turnRightRestricted(90)],
      [repeat(4)]
    ],
    freePlay: false
  },
  // Level 4: Triangle.
  '1_4': {
    answer: answer(1, 4),
    ideal: 5,
    toolbox: toolbox(1, 4),
    startBlocks: startBlocks(1, 4),
    requiredBlocks: [
      [MOVE_FORWARD_INLINE],
      [repeat(3)],
      [{
        test: 'turnRight',
        type: 'draw_turn_by_constant',
        titles: {VALUE: '???'}
      }]
    ],
    freePlay: false
  },
  // Level 5: Envelope.
  '1_5': {
    answer: answer(1, 5),
    ideal: 6,
    toolbox: toolbox(1, 5),
    startBlocks: startBlocks(1, 5),
    requiredBlocks: [
      [repeat(3)],
      [turnRightRestricted(120)],
      [MOVE_FORWARD_INLINE]
    ],
    freePlay: false
  },
  // Level 6: triangle and square.
  '1_6': {
    answer: answer(1, 6),
    ideal: 7,
    toolbox: toolbox(1, 6),
    startBlocks: startBlocks(1, 6),
    requiredBlocks: [
      [repeat(3)],
      [turnRightRestricted(120)],
      [MOVE_FORWARD_INLINE],
      [MOVE_BACKWARD_INLINE, MOVE_FORWARD_INLINE]
    ],
    freePlay: false
  },
  // Level 7: glasses.
  '1_7': {
    answer: answer(1, 7),
    ideal: 12,
    toolbox: toolbox(1, 7),
    startBlocks: startBlocks(1, 7),
    requiredBlocks: [
      [drawTurnRestricted(90)],
      [MOVE_FORWARD_INLINE],
      [repeat(4)],
      [MOVE_BACKWARD_INLINE, MOVE_FORWARD_INLINE]
    ],
    freePlay: false,
    startDirection: 0
  },
  // Level 8: spikes.
  '1_8': {
    answer: answer(1, 8),
    ideal: 6,
    toolbox: toolbox(1, 8),
    startBlocks: startBlocks(1, 8),
    requiredBlocks: [[repeat(8)]],
    freePlay: false
  },
  // Level 9: circle.
  '1_9': {
    answer: answer(1, 9),
    ideal: 0,
    toolbox: toolbox(1, 9),
    startBlocks: startBlocks(1, 9),
    freePlay: false,
    sliderSpeed: 0.9,
    permittedErrors: 10,
    failForCircleRepeatValue: true
  },
  // Level 10: playground.
  '1_10': {
    answer: answer(1, 10),
    toolbox: toolbox(1, 10),
    startBlocks: startBlocks(1, 10),
    freePlay: true
  },
  // Formerly Page 2.
  // Level 1: Square.
  '2_1': {
    answer: answer(2, 1),
    ideal: 7,
    toolbox: toolbox(2, 1),
    startBlocks: startBlocks(2, 1),
    requiredBlocks: [
      [repeat(4)],
      [turnRight(90)],
      [move(100)]
    ],
    freePlay: false
  },
  // Level 2: Small green square.
  '2_2': {
    answer: answer(2, 2),
    ideal: 4,
    toolbox: toolbox(2, 2),
    startBlocks: startBlocks(2, 2),
    requiredBlocks: [
      [drawASquare('??')]
    ],
    freePlay: false
  },
  // Level 3: Three squares.
  '2_3': {
    answer: answer(2, 3),
    ideal: 7,
    toolbox: toolbox(2, 3),
    startBlocks: startBlocks(2, 3),
    requiredBlocks: [
      [repeat(3)],
      [drawASquare(100)],
      [turnRight(120)]
    ],
    freePlay: false
  },
  // Level 4: 36 squares.
  '2_4': {
    answer: answer(2, 4),
    ideal: 7,
    toolbox: toolbox(2, 4),
    startBlocks: startBlocks(2, 4),
    freePlay: false
  },
  // Level 5: Different size squares.
  '2_5': {
    answer: answer(2, 5),
    ideal: 10,
    toolbox: toolbox(2, 5),
    startBlocks: startBlocks(2, 5),
    requiredBlocks: [
      [drawASquare('??')]
    ],
    freePlay: false
  },
  // Level 6: For-loop squares.
  '2_6': {
    answer: answer(2, 6),
    ideal: 6,
    toolbox: toolbox(2, 6),
    startBlocks: startBlocks(2, 6),
    // This is not displayed properly.
    requiredBlocks: [[simpleBlock('variables_get_counter')]],
    freePlay: false
  },
  // Level 7: Boxy spiral.
  '2_7': {
    answer: answer(2, 7),
    ideal: 8,
    toolbox: toolbox(2, 7),
    startBlocks: startBlocks(2, 7),
    requiredBlocks: [
      [simpleBlock('controls_for_counter')],
      [move('??')],
      [simpleBlock('variables_get_counter')],
      [turnRight(90)]
    ],
    freePlay: false
  },
  // Prep for Level 8: Two snowmen.
  '2_7_5': {
    answer: answer(2, 7.5),
    initialY: 300,
    ideal: 4,
    toolbox: toolbox(2, 8),
    startBlocks: startBlocks(2, 7.5),
    requiredBlocks: [
      [drawASnowman(250)],
      [drawASnowman(100)]
    ],
    freePlay: false,
    sliderSpeed: 0.9,
    startDirection: 0
  },
  // Level 8: Three snowmen.
  '2_8': {
    answer: answer(2, 8),
    initialX: 100,
    ideal: 11,
    toolbox: toolbox(2, 8),
    startBlocks: startBlocks(2, 8),
    requiredBlocks: [
      [drawASnowman(150)],
      [turnRight(90)],
      [turnLeft(90)],
      [{
        test: 'jump',
        type: 'jump',
        values: {'VALUE': makeMathNumber(100)}
      }],
      [simpleBlock('jump')],
      [repeat(3)]
    ],
    freePlay: false,
    sliderSpeed: 0.9,
    startDirection: 0
  },
  // Level 9: Snowman family.
  '2_9': {
    answer: answer(2, 9),
    initialX: 100,
    ideal: 12,
    toolbox: toolbox(2, 9),
    startBlocks: startBlocks(2, 9),
    requiredBlocks: [
      [drawASnowman('??')],
      [simpleBlock('controls_for_counter')],
      [simpleBlock('variables_get_counter')],
      [turnRight(90)],
      [turnLeft(90)],
      [{
        test: 'jump',
        type: 'jump',
        values: {'VALUE': makeMathNumber(60)}
      }]
    ],
    freePlay: false,
    sliderSpeed: 0.9,
    startDirection: 0
  },
  // Level 10: playground.
  '2_10': {
    answer: answer(2, 10),
    freePlay: true,
    toolbox: toolbox(2, 10),
    startBlocks: startBlocks(2, 10)
  },
  // Formerly Page 3.
  // Level 1: Call 'draw a square'.
  '3_1': {
    answer: answer(3, 1),
    ideal: 1,
    toolbox: toolbox(3, 1),
    startBlocks: startBlocks(3, 1),
    requiredBlocks: [
      [levelBase.call(msg.drawASquare())]
    ],
    freePlay: false
  },
  // Level 2: Create "draw a triangle".
  '3_2': {
    answer: answer(3, 2),
    ideal: 7,
    toolbox: toolbox(3, 2),
    startBlocks: startBlocks(3, 2),
    requiredBlocks: [
      [repeat(3)],
      [move(100)],
      [turnRight(120)],
      [levelBase.call(msg.drawATriangle())]
    ],
    freePlay: false
  },
  // Level 3: Fence the animals.
  '3_3': {
    answer: answer(3, 3),
    initialY: 350,
    ideal: 7,
    toolbox: toolbox(3, 3),
    startBlocks: startBlocks(3, 3),
    requiredBlocks: [
      [levelBase.call(msg.drawATriangle())],
      [move(100)],
      [levelBase.call(msg.drawASquare())]
    ],
    freePlay: false,
    images: [
      {
        filename: 'cat.svg',
        position: [170, 247]
      },
      {
        filename: 'cat.svg',
        position: [170, 47]
      },
      {
        filename: 'cow.svg',
        position: [182, 147]
      }
    ],
    startDirection: 0
  },
  // Level 4: House the lion.
  '3_4': {
    answer: answer(3, 4),
    ideal: 6,
    toolbox: toolbox(3, 4),
    startBlocks: startBlocks(3, 4),
    requiredBlocks: [
      [levelBase.call(msg.drawASquare())],
      [move(100)],
      [turnRight(30)],
      [levelBase.call(msg.drawATriangle())]
    ],
    freePlay: false,
    images: [
      {
        filename: 'cow.svg',
        position: [187, 97]
      }
    ],
    startDirection: 0
  },
  // Level 5: Create "draw a house".
  '3_5': {
    answer: answer(3, 5),
    ideal: 8,
    toolbox: toolbox(3, 5),
    startBlocks: startBlocks(3, 5),
    requiredBlocks: [
      [levelBase.define(msg.drawAHouse())],
      [levelBase.call(msg.drawASquare())],
      [move(100)],
      [turnRight(30)],
      [levelBase.call(msg.drawATriangle())],
      [levelBase.call(msg.drawAHouse())]
    ],
    freePlay: false,
    images: [
      {
        filename: 'cat.svg',
        position: [170, 90]
      },
      {
        filename: 'cat.svg',
        position: [222, 90]
      }
    ],
    startDirection: 0
  },
  // Level 6: Add parameter to "draw a triangle".
  '3_6': {
    answer: answer(3, 6),
    initialY: 350,
    ideal: 17,
    toolbox: toolbox(3, 6),
    startBlocks: startBlocks(3, 6),
    requiredBlocks: [
      [defineWithArg(msg.drawATriangle(), msg.lengthParameter())],
      [simpleBlock('variables_get_length')],
      [levelBase.callWithArg(msg.drawATriangle(), msg.lengthParameter())]
    ],
    freePlay: false,
    images: [
      {
        filename: 'lion.svg',
        position: [185, 100]
      },
      {
        filename: 'cat.svg',
        position: [175, 248]
      }
    ],
    startDirection: 0
  },
  // Level 7: Add parameter to "draw a house".
  '3_7': {
    answer: answer(3, 7),
    initialY: 350,
    ideal: 11,
    toolbox: toolbox(3, 7),
    startBlocks: startBlocks(3, 7),
    requiredBlocks: [
      [defineWithArg(msg.drawAHouse(), msg.lengthParameter())],
      [levelBase.callWithArg(msg.drawASquare(), msg.lengthParameter())],
      [levelBase.callWithArg(msg.drawATriangle(), msg.lengthParameter())],
      [simpleBlock('variables_get_length')],
      [levelBase.callWithArg(msg.drawAHouse(), msg.lengthParameter())]
    ],
    freePlay: false,
    images: [
      {
        filename: 'elephant.svg',
        position: [205, 220]
      }
    ],
    startDirection: 0
  },
  // Level 8: Draw houses.
  '3_8': {
    answer: answer(3, 8),
    initialX: 20,
    initialY: 350,
    ideal: 27,
    toolbox: toolbox(3, 8),
    startBlocks: startBlocks(3, 8),
    freePlay: false,
    images: [
      {
        filename: 'cat.svg',
        position: [16, 170]
      },
      {
        filename: 'lion.svg',
        position: [15, 250]
      },
      {
        filename: 'elephant.svg',
        position: [127, 220]
      },
      {
        filename: 'cow.svg',
        position: [255, 250]
      }
    ],
    startDirection: 0
  },
  // Level 9: Draw houses with for loop.
  '3_9': {
    answer: answer(3, 9),
    initialX: 20,
    initialY: 350,
    ideal: 27,
    toolbox: toolbox(3, 9),
    startBlocks: startBlocks(3, 9),
    requiredBlocks: [
      [simpleBlock('controls_for_counter')],
      [simpleBlock('variables_get_counter')]
    ],
    freePlay: false,
    images: [
      {
        filename: 'cat.svg',
        position: [-10, 270]
      },
      {
        filename: 'cow.svg',
        position: [53, 250]
      },
      {
        filename: 'elephant.svg',
        position: [175, 220]
      }
    ],
    failForTooManyBlocks: true,
    startDirection: 0
  },
  // Level 10: playground.
  '3_10': {
    answer: answer(3, 10),
    freePlay: true,
    toolbox: toolbox(3, 10),
    startBlocks: startBlocks(3, 10)
  },
  // Formerly Page 4.
  // Level 1: One triangle.
  '4_1': {
    answer: answer(4, 1),
    ideal: 3,
    toolbox: toolbox(4, 1),
    startBlocks: startBlocks(4, 1),
    requiredBlocks: [
      [MOVE_FORWARD_INLINE],
      [repeat(3)],
      [{
        test: 'turnRight',
        type: 'draw_turn_by_constant',
        titles: {VALUE: '???'}
      }]
    ],
  },
  // Level 2: Two triangles.
  '4_2': {
    answer: answer(4, 2),
    ideal: 11,
    toolbox: toolbox(4, 2),
    startBlocks: startBlocks(4, 2),
    requiredBlocks: [
      [MOVE_FORWARD_INLINE],
      [repeat(3)],
      [{
        test: 'turnRight',
        type: 'draw_turn_by_constant',
        titles: {VALUE: '???'}
      }]
    ],
    sliderSpeed: 0.5
  },
  // Level 3: Four triangles using repeat.
  '4_3': {
    answer: answer(4, 3),
    ideal: 7,
    toolbox: toolbox(4, 3),
    startBlocks: startBlocks(4, 3),
    requiredBlocks: [
      [MOVE_FORWARD_INLINE],
      [repeat(3)],
      [{
        test: 'turnRight',
        type: 'draw_turn_by_constant',
        titles: {VALUE: '???'}
      }]
    ],
    sliderSpeed: 0.7
  },
  // Level 4: Ten triangles with missing repeat number.
  '4_4': {
    answer: answer(4, 4),
    ideal: 7,
    toolbox: toolbox(4, 4),
    startBlocks: startBlocks(4, 4),
    requiredBlocks: [
      [MOVE_FORWARD_INLINE],
      [repeat(3)],
      [{
        test: 'turnRight',
        type: 'draw_turn_by_constant',
        titles: {VALUE: '???'}
      }]
    ],
    sliderSpeed: 0.7
  },
  // Level 5: 36 triangles with missing angle number.
  '4_5': {
    answer: answer(4, 5),
    ideal: 7,
    toolbox: toolbox(4, 5),
    startBlocks: startBlocks(4, 5),
    requiredBlocks: [
      [MOVE_FORWARD_INLINE],
      [repeat(3)],
      [{
        test: 'turnRight',
        type: 'draw_turn_by_constant',
        titles: {VALUE: '???'}
      }]
    ],
    sliderSpeed: 0.9
  },
  // Level 6: 1 square.
  '4_6': {
    answer: answer(4, 6),
    ideal: 3,
    toolbox: toolbox(4, 6),
    startBlocks: startBlocks(4, 6),
    requiredBlocks: [
      [moveForwardInline(20)],
      [repeat(4)],
      [{
        test: 'turnRight',
        type: 'draw_turn_by_constant',
        titles: {VALUE: '???'}
      }]
    ],
    permittedErrors: 10,
    startDirection: 0
  },
  // Level 7: Square Ladder.
  '4_7': {
    answer: answer(4, 7),
    initialY: 300,
    ideal: 7,
    toolbox: toolbox(4, 7),
    startBlocks: startBlocks(4, 7),
    requiredBlocks: [
      [moveForwardInline(20)],
      [repeat(4)],
      [{
        test: 'turnRight',
        type: 'draw_turn_by_constant',
        titles: {VALUE: '???'}
      }]
    ],
    startDirection: 0,
    sliderSpeed: 0.7
  },
  // Level 8: Ladder square.
  '4_8': {
    answer: answer(4, 8),
    initialX: 100,
    initialY: 300,
    ideal: 9,
    toolbox: toolbox(4, 8),
    startBlocks: startBlocks(4, 8),
    requiredBlocks: [
      [moveForwardInline(20)],
      [repeat(4)],
      [{
        test: 'turnRight',
        type: 'draw_turn_by_constant',
        titles: {VALUE: '???'}
      }]
    ],
    startDirection: 0,
    sliderSpeed: 0.9
  },
  // Level 9: Ladder square with a different angle.
  '4_9': {
    answer: answer(4, 9),
    initialX: 150,
    initialY: 350,
    ideal: 9,
    toolbox: toolbox(4, 9),
    startBlocks: startBlocks(4, 9),
    requiredBlocks: [
      [moveForwardInline(20)],
      [repeat(4)],
      [{
        test: 'turnRight',
        type: 'draw_turn_by_constant',
        titles: {VALUE: '???'}
      }]
    ],
    startDirection: 330,
    sliderSpeed: 0.9
  },
  // Level 10: Ladder polygon.
  '4_10': {
    answer: answer(4, 10),
    initialX: 75,
    initialY: 300,
    ideal: 9,
    toolbox: toolbox(4, 10),
    startBlocks: startBlocks(4, 10),
    requiredBlocks: [
      [moveForwardInline(20)],
      [repeat(4)],
      [{
        test: 'turnRight',
        type: 'draw_turn_by_constant',
        titles: {VALUE: '???'}
      }]
    ],
    startDirection: 0,
    sliderSpeed: 0.9
  },
  // Level 11: playground.
  '4_11': {
    answer: answer(4, 11),
    freePlay: true,
    initialX: 75,
    initialY: 300,
    toolbox: toolbox(4, 11),
    startBlocks: startBlocks(4, 11),
    startDirection: 0,
    sliderSpeed: 0.9
   },

  // Formerly Page 5.
  // Level 1: playground.
  '5_1': {
    answer: answer(5, 1),
    freePlay: true,
    toolbox: toolbox(5, 1),
    startBlocks: startBlocks(5, 1)
  }
};
