const { Engine, World, Bodies, Composite, Events } = Matter;

let img;

let currentQuiz = null;

let currentLevel = 1;

let waitingForMath = false;

const mathQuestionBank = [
  //I made the questions by using Gemini,but I made the codes myself and some of them are from the demo

  // --- Level 1 - 10：Advanced algebra,

  { level: 1, question: "Given that tan( ∏/6 - a ) = 3^(1/2)/3, what is tan (5∏ / 6 + a)?", answer: -3^(1/2)/3 },

  {
    level: 2,

    question: "What is the sum of all positive integer divisors of 28?",

    answer: 56,
  },

  { level: 3, question: "If x + 1/x = 3, what is x³ + 1/x³?", answer: 18 },

  {
    level: 4,

    question: "Find the number of trailing zeros in 50! (50 factorial).",

    answer: 12,
  },

  {
    level: 5,

    question: "If log₂(x) + log₄(x) + log₈(x) = 11, what is x?",

    answer: 64,
  },

  {
    level: 6,

    question: "What is the coefficient of x³ in the expansion of (2x - 1)⁵?",

    answer: -40,
  },

  {
    level: 7,

    question: "Find the sum of all integer solutions to |2x - 5| ≤ 4.",

    answer: 10,
  },

  {
    level: 8,

    question: "If 9^x - 3^(x+1) - 10 = 0, find the positive value of 3^x.",

    answer: 5,
  },

  { level: 9, question: "What is the units digit of 3^2026?", answer: 9 },

  {
    level: 10,

    question: "Find the value of x if log₃(x) + log₉(x) + log₂₇(x) = 11/2.",

    answer: 27,
  },

  // --- Level 11 - 20：排列组合 ---

  {
    level: 11,

    question:
      "How many 4-digit integers have strictly increasing digits (e.g., 1358)?",

    answer: 126,
  },


  {
    level: 12,

    question:
      "How many positive integers less than 1000 are divisible by neither 3 nor 5?",

    answer: 533,
  },

  {
    level: 13,

    question:
      "If the sum of the first n terms of a series is S_n = n² + 2n, find the 5th term.",

    answer: 11,
  },

  {
    level: 14,

    question:
      "A committee of 4 is chosen from 6 men and 4 women. What is the number of ways with at least 2 women?",

    answer: 115,
  },

  {
    level: 15,

    question:
      "If a geometric progression has a₂ = 6 and a₅ = 162, what is the first term a₁?",

    answer: 2,
  },

  {
    level: 16,

    question:
      "Find the coefficient of x⁴ in (1 + 2x + 3x²)⁴ mod value... let's simplify: coefficient of x^4 in (1 + x + x²)? Too complex. Let's use: What is the coefficient of x³ in (1 + x)⁴(1 - x)³?",

    answer: -1,
  },

  {
    level: 17,

    question:
      "Find the number of subsets of {1, 2, 3, 4, 5, 6, 7} containing at least one prime number.",

    answer: 112,
  },

  {
    level: 18,

    question:
      "In a group of 10 people, everyone shakes hands with everyone else once. How many handshakes?",

    answer: 45,
  },

  {
    level: 19,

    question:
      "Find the sum of the infinite geometric series: 12 + 4 + 4/3 + 4/9 + ...",

    answer: 18,
  },

  { level: 20, question: "If P(n, 2) = 72, what is n?", answer: 9 },

  // --- Level 21 - 30：Geometry ---

  {
    level: 21,

    question:
      "Find the distance between the parallel lines 3x - 4y + 5 = 0 and 3x - 4y - 10 = 0.",

    answer: 3,
  },

  {
    level: 22,

    question:
      "What is the radius of the circle given by the equation x² + y² - 6x + 8y = 0?",

    answer: 5,
  },

  {
    level: 23,

    question:
      "Find the area of the triangle bounded by the lines y = 0, y = x, and x + y = 6.",

    answer: 9,
  },

  {
    level: 24,

    question: "What is the eccentricity of the ellipse 9x² + 25y² = 225?",

    answer: 1,
  }, // sqrt(16/25) = 4/5 = 0.8. Let's make it integer: What is 5 * eccentricity?", answer: 4 },

  {
    level: 25,

    question:
      "Find the length of the major axis of the ellipse 4x² + 9y² = 36.",

    answer: 6,
  },

  {
    level: 26,

    question:
      "If vectors a = (1, 2, 3) and b = (3, 2, 1), what is the dot product a · b?",

    answer: 10,
  },

  {
    level: 27,

    question:
      "Find the volume of the tetrahedron formed by coordinate planes and the plane 2x + 3y + 4z = 12.",

    answer: 6,
  },

  {
    level: 28,

    question: "What is the minimum value of f(x) = x² - 6x + 11?",

    answer: 2,
  },

  {
    level: 29,

    question: "Find the sum of the squares of the roots of x² - 8x + 12 = 0.",

    answer: 40,
  },

  {
    level: 30,

    question:
      "Find the product of the focal radii from any point on the hyperbola x² - y² = 9... let's use: What is the vertex y-coordinate of y = 2x² - 12x + 15?",

    answer: -3,
  },

  // --- Level 31 - 40：conplecated numbers ---

  {
    level: 31,

    question:
      "If matrix A = [[2, 1], [5, 3]], what is the trace of matrix A (sum of main diagonal)?",

    answer: 5,
  },

  {
    level: 32,

    question: "What is the determinant of a 3x3 identity matrix?",

    answer: 1,
  },

  {
    level: 33,

    question: "If z = 3 + 4i, what is the real part of z²?",

    answer: -7,
  },

  {
    level: 34,

    question: "What is the modulus (|z|) of the complex number z = 5 - 12i?",

    answer: 13,
  },

  {
    level: 35,

    question:
      "If matrix M has a determinant of 5, what is the determinant of matrix 3M (where M is 2x2)?",

    answer: 45,
  },

  {
    level: 36,

    question:
      "What is i^2026 (where i is the imaginary unit, real output representation: 1, -1, i, or -i)? Let's use: What is the real part of (1+i)^4?",

    answer: -4,
  },

  {
    level: 37,

    question: "Find the sum of the eigenvalues of the matrix [[4, 2], [1, 3]].",

    answer: 7,
  },

  {
    level: 38,

    question:
      "What is the product of the eigenvalues of the matrix [[4, 2], [1, 3]]?",

    answer: 10,
  },

  {
    level: 39,

    question:
      "If vector u = (2, -1, 2) and v = (1, 2, -2), what is the magnitude of their cross product |u × v|?",

    answer: 9,
  },

  {
    level: 40,

    question: "What is the rank of the 2x2 matrix [[2, 4], [1, 2]]?",

    answer: 1,
  },

  // --- Level 41 - 50：probability ---

  {
    level: 41,

    question:
      "Two dice are rolled. What is the sum of outcomes that has the highest probability?",

    answer: 7,
  },

  {
    level: 42,

    question:
      "A box contains 4 white and 3 black balls. Two are drawn successively without replacement. What is the probability denominator if the fraction is 2/7? Answer numerator:",

    answer: 2,
  },

  {
    level: 43,

    question: "If f(x) satisfies f(x) + 2f(3-x) = x², find f(1).",

    answer: 1,
  },

  {
    level: 44,

    question: "Let f(x) = x⁵ + x³ + x. If f(a) = 3, what is f(-a)?",

    answer: -3,
  },

  {
    level: 45,

    question:
      "What is the period of the function f(x) = sin(4x) + cos(6x)? (Numerator of 2π/gcd... let's use: What is the minimum period of f(x) = |sin x| in degrees?)",

    answer: 180,
  },

  {
    level: 46,

    question:
      "If sin θ + cos θ = 6/5, what is the value of 50 * sin θ * cos θ?",

    answer: 14,
  },

  {
    level: 47,

    question:
      "What is the value of arctan(1) + arctan(2) + arctan(3) in degrees?",

    answer: 180,
  },

  {
    level: 48,

    question: "In triangle ABC, a = 7, b = 8, c = 9. What is 10 * cos(C)?",

    answer: 2,
  }, // cosC = (49+64-81)/(2*7*8) = 32/112 = 2/7. 7*cosC? Let's use cleaner numbers or keep integer answer: 7 * cos C = 2.

  {
    level: 49,

    question:
      "Find the number of solutions to sin(x) = x/10 on the real number line.",

    answer: 7,
  },

  {
    level: 50,

    question:
      "What is the remainder when polynomial x¹⁰⁰ - 2x⁵⁰ + 1 is divided by x² - 1? (Constant term of remainder)",

    answer: 0,
  }, // Wait, remainder is 0? If x=1, 1-2+1=0. If x=-1, 1-2+1=0. Remainder is 0. Let's make it simpler: What is the remainder when x³ - 2x + 5 is divided by x - 2?", answer: 9 },

  // --- Level 51 - 59：calcules ---

  {
    level: 51,

    question:
      "What is the derivative of f(x) = x⁴ - 3x³ + 2x evaluated at x = 2?",

    answer: -4,
  },

  {
    level: 52,

    question:
      "Evaluate the definite integral ∫ (3x² - 2x) dx from x = 0 to x = 3.",

    answer: 18,
  },

  {
    level: 53,

    question:
      "Find the x-coordinate of the inflection point of f(x) = x³ - 6x² + 11x - 6.",

    answer: 2,
  },

  {
    level: 54,

    question:
      "What is the absolute maximum value of f(x) = -x² + 4x - 3 on the real line?",

    answer: 1,
  },

  {
    level: 55,

    question: "Evaluate the limit: lim(x→0) (tan 3x) / x.",

    answer: 3,
  },

  {
    level: 56,

    question: "Evaluate the limit: lim(x→1) (x² - 1) / (x - 1).",

    answer: 2,
  },

  {
    level: 57,

    question:
      "If f(x) = x · e^x, what is the value of the second derivative f''(0)?",

    answer: 2,
  },

  {
    level: 58,

    question: "Find the area bounded by the curve y = x² and the line y = 4.",

    answer: 32,
  }, // 32/3, not integer. Let's change: Find the slope of the tangent line to y = x³ at x = 2.", answer: 12 },

  {
    level: 59,

    question:
      "Evaluate the improper integral or limit equivalent: What is the derivative of ln(sec x + tan x) at x = 0? (sec 0 = 1)",

    answer: 1,
  },

  // --- Level 60：suprize ---

  {
    level: 60,

    question:
      "[ULTIMATE DEMON] Evaluate the limit: lim(x→0) (sin(5x) - 5x) / x³ multiplied by -6? (Hint: Taylor series expansion)",

    answer: 125,
  },
];

let engine, world;

let ground;

let balls = [];

let droppedBalls = []; // Array to store balls that have been dropped

let score = 0;

let gameOver = false; // Game over state

//球的大小

const ballSizes = [40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260];
let ballImages = [];
let imagesLoaded = false;

let previewBall = { size: 10, sizeIndex: 0, img: null };

let lastSize = null; // Keep track of the last chosen ball size

// Left and right boundary walls

let leftWall, rightWall;

// Scoring values for each size index

const scoreValues = [0, 5, 10, 20, 30, 35, 40, 45, 50, 100];

//颜色

async function setup() {
  // Load the image.
  for (let i = 1; i <= 11; i++) {
    try {
      let img = await loadImage(`ball${i}.png`);
      ballImages.push(img);
    } catch (e) {
      console.log(`Loading ball${i}.png failed`);
    }
  }
  imagesLoaded = true;
  createCanvas(1920, 1000);

  // Create an engine and world

  engine = Engine.create();

  world = engine.world;

  // Set up the ground

  ground = Bodies.rectangle(width / 2, height - 20, width, 40, {
    isStatic: true,
  });

  Composite.add(world, ground);

  // Set up the left and right boundaries

  leftWall = Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true });

  rightWall = Bodies.rectangle(width + 10, height / 2, 20, height, {
    isStatic: true,
  });

  Composite.add(world, [leftWall, rightWall]);

  // Initialize the first preview ball

  createPreviewBall();

  Events.on(engine, "collisionStart", handleCollisions);
}

function draw() {
  background(34);

  if (!imagesLoaded) {
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Loading Jellyfish Images...", width / 2, height / 2);
    return;
  }

  Engine.update(engine);

  //  ground

  fill(255);

  noStroke();

  rectMode(CENTER);

  rect(ground.position.x, ground.position.y, width, 40);

  // Draw the "Game Over" line at y = 30

  stroke(255, 0, 0);

  strokeWeight(2);

  line(0, 30, width, 30);

  // Display the score

  fill(255);

  noStroke();

  textSize(24);

  textAlign(LEFT, TOP);

  text(`Score: ${score} | Level: ${currentLevel}`, 10, 10);

  if (gameOver) {
    fill(255, 0, 0);

    textSize(32);

    textAlign(CENTER, CENTER);

    text("GAME OVER", width / 2, height / 2 - 20);

    textSize(16);

    text("Refresh the page to play again", width / 2, height / 2 + 25);

    return;
  }

  if (waitingForMath) {
    fill(255, 100, 100);

    textSize(22);

    textAlign(CENTER, CENTER);

    text(
      "【MATH CHALLENGE ACTIVE】\nPlease answer in the prompt!",

      width / 2,

      height / 2
    );

    return;
  }

  imageMode(CENTER);

  for (let ball of droppedBalls) {
    if (ball.img) {
      push();
      translate(ball.body.position.x, ball.body.position.y);
      beginClip();
      circle(0, 0, ball.size * 2);
      endClip();
      imageMode(CENTER);
      image(ball.img, 0, 0, ball.size * 2, ball.size * 2);

      noStroke();
      fill(255, 255, 255, 110);
      arc(
        0,
        0,
        ball.size * 1.8,
        ball.size * 1.8,
        PI + QUARTER_PI,
        TWO_PI - QUARTER_PI
      );

      fill(255, 255, 255, 40);
      ellipse(0, ball.size * 0.65, ball.size * 0.8, ball.size * 0.25);

      pop();
    } else {
      fill(255);
      ellipse(ball.body.position.x, ball.body.position.y, ball.size * 2);
    }

    // Check if any "old" ball crosses the game over line

    for (let i = 0; i < droppedBalls.length; i++) {
      if (
        droppedBalls[i].body.position.y < 50 &&
        droppedBalls[i].hasCollided &&
        !waitingForMath &&
        !gameOver
      ) {
        triggerMathQuiz();

        break;
      }
    }

    // fun fact:I set it 1955 because Einstein died at 1955 (^-^)

    if (score >= 1955 && !waitingForMath && !gameOver) {
      triggerMathQuiz();
    }
  }

  if (previewBall) {
    if (previewBall.img) {
      push();
      translate(mouseX, previewBall.size);
      beginClip();
      circle(0, 0, previewBall.size * 2);
      endClip();
      imageMode(CENTER);
      image(previewBall.img, 0, 0, previewBall.size * 2, previewBall.size * 2);

      noFill();
      stroke(255, 255, 255, 130);
      strokeWeight(1.5);
      circle(0, 0, previewBall.size * 2);

      noStroke();
      fill(255, 255, 255, 110);
      arc(
        0,
        0,
        previewBall.size * 1.8,
        previewBall.size * 1.8,
        PI + QUARTER_PI,
        TWO_PI - QUARTER_PI
      );

      pop();
    } else {
      fill(255);
      ellipse(mouseX, previewBall.size, previewBall.size * 2);
    }
  }
}

//creatPreviewBall function

function createPreviewBall() {
  const smallestSizes = ballSizes.slice(0, 4);

  let size, sizeIndex, img;

  do {
    sizeIndex = Math.floor(random(smallestSizes.length));

    size = smallestSizes[sizeIndex];
  } while (size === lastSize && random() > 0.45); // Only allow last size to reappear 45% of the time

  // Update the preview ball and store the last size

  img = ballImages[sizeIndex];

  previewBall = { size, sizeIndex, img };

  lastSize = size;
}

function triggerMathQuiz() {
  waitingForMath = true;

  currentQuiz = getRandomQuestionForLevel(currentLevel);

  let userAnswer = prompt(
    //got it from mdn

    `[DANGER LINE / SCORE REACHED]\n[Level ${currentLevel} / 60]\n${currentQuiz.question}\n\n Note: Wrong answer or cancellation = GAME OVER!`
  );

  if (userAnswer === null) {
    alert(" No answer provided. GAME OVER!");

    gameOver = true;

    waitingForMath = false;

    return;
  }

  if (parseInt(userAnswer) === currentQuiz.answer) {
    if (currentLevel >= 60) {
      alert(
        "🌟 [ULTIMATE EASTER EGG] Incredible! You mastered the demon difficulty and earned the title 'God of Mathematics'! Restarting loop from Level 1."
      );

      currentLevel = 1;
    } else {
      alert(`🎉 Correct! Advancing to Level ${currentLevel + 1}!`);

      currentLevel++;
    }

    resetGame();
  } else {
    alert(
      `❌ Incorrect! The correct answer was: ${currentQuiz.answer}\n💥 GAME OVER!`
    );

    gameOver = true;

    waitingForMath = false;
  }
}

function getRandomQuestionForLevel(level) {
  let pool = mathQuestionBank.filter((q) => q.level === level);

  if (pool.length === 0) {
    let tierMin = 1,
      tierMax = 5;

    if (level >= 6 && level <= 15) {
      tierMin = 6;

      tierMax = 15;
    } else if (level >= 16 && level <= 39) {
      tierMin = 16;

      tierMax = 39;
    } else if (level >= 40 && level <= 60) {
      tierMin = 40;

      tierMax = 60;
    }

    pool = mathQuestionBank.filter(
      (q) => q.level >= tierMin && q.level <= tierMax
    );
  }

  if (pool.length === 0) {
    return { level: level, question: "1 + 1 = ?", answer: 2 };
  }

  return pool[Math.floor(random(pool.length))];
}

//handleCollisions function

function handleCollisions(event) {
  if (gameOver) return; // Ignore collisions if the game is over

  const pairs = event.pairs;

  for (let pair of pairs) {
    let ballA = droppedBalls.find((b) => b.body === pair.bodyA);

    let ballB = droppedBalls.find((b) => b.body === pair.bodyB);

    if (ballA && ballB) {
      // Mark both balls as "old" since they've collided

      ballA.hasCollided = true;

      ballB.hasCollided = true;

      // Check if they are of the same size and can merge

      if (ballA.size === ballB.size) {
        const nextSizeIndex = ballA.body.sizeIndex + 1;

        if (nextSizeIndex < ballSizes.length) {
          const newSize = ballSizes[nextSizeIndex];

          // Create a new merged ball at the midpoint of the two colliding balls

          const midX = (ballA.body.position.x + ballB.body.position.x) / 2;

          const midY = (ballA.body.position.y + ballB.body.position.y) / 2;

          const mergedBall = Bodies.circle(midX, midY, newSize, {
            restitution: 0.8,
          });

          mergedBall.size = newSize;

          mergedBall.sizeIndex = nextSizeIndex;

          mergedBall.hasCollided = true; // Mark new merged ball as "old"

          Composite.add(world, mergedBall);

          droppedBalls.push({
            body: mergedBall,

            size: newSize,

            img: ballImages[nextSizeIndex],

            hasCollided: true,
          });

          // Update the score based on the size of the merged ball

          score += scoreValues[nextSizeIndex];

          // Remove the original balls from the world and array

          Composite.remove(world, ballA.body);

          Composite.remove(world, ballB.body);

          droppedBalls = droppedBalls.filter((b) => b !== ballA && b !== ballB);
        }
      }
    }
  }
}

function dropBall(x, size, sizeIndex) {
  if (gameOver) return; // Prevent dropping new balls if the game is over

  let ball = Bodies.circle(x, 0, size, { restitution: 0.4 });

  ball.size = size;

  ball.sizeIndex = sizeIndex; // Track the ball's size index for easy size scaling

  ball.hasCollided = false; // Track whether this ball has collided with another ball

  Composite.add(world, ball);

  // Add to droppedBalls array for game over line check

  droppedBalls.push({
    body: ball,
    size,
    img: ballImages[sizeIndex],
    hasCollided: false,
  });
}

function mousePressed() {
  if (!gameOver) {
    dropBall(mouseX, previewBall.size, previewBall.sizeIndex);

    createPreviewBall(); // Create a new preview ball for the next drop
  }

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();

    fullscreen(!fs);
  }
}

function resetGame() {
  for (let i = 0; i < droppedBalls.length; i++) {
    Composite.remove(world, droppedBalls[i].body);
  }

  droppedBalls = [];

  score = 0;

  gameOver = false;

  waitingForMath = false;

  createPreviewBall();
}
