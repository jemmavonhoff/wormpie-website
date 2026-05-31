const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  try {
    const imagesDir = path.join(process.env.LAMBDA_TASK_ROOT, 'images');
    const files = fs.readdirSync(imagesDir);
    const images = files.filter(f =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(f) && f !== '.gitkeep'
    );
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(images)
    };
  } catch (e) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify([])
    };
  }
};
