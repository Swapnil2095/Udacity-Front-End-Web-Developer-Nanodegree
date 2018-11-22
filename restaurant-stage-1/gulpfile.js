var gulp = require("gulp");
var del = require("del"); // a simple npm package (not gulp plugin) for deleting stuff
var responsive = require("gulp-responsive");
var runSequence = require("run-sequence");

const paths = {
  images: {
    jpg: {
      src: "images/*.jpg",
      dest: "img/"
    }
  }
};

//create responsive images for jpg files
gulp.task("jpg-images", function() {
  return gulp
    .src(paths.images.jpg.src)
    .pipe(
      responsive(
        {
          // Resize all jpg images to three different sizes: 280, 400 and 800
          "**/*.jpg": [
            {
              width: 800,
              quality: 50,
              rename: { suffix: "-large" }
            },
            {
              width: 400,
              quality: 40,
              rename: { suffix: "-medium" }
            },
            {
              width: 280,
              quality: 30,
              rename: { suffix: "-small" }
            },
            {
              width: 64,
              quality: 10,
              sharp: true,
              rename: { suffix: "-placeholder" }
            }
          ]
        },
        {
          // global settings for all jpg images
          progressive: true,
          // needed to avoid errors when images aren't "newer"
          // since gulp-responsive won't have anything to do.
          errorOnUnusedConfig: false,
          // Strip all metadata
          withMetadata: false
        }
      )
    )
    .pipe(gulp.dest(paths.images.jpg.dest));
});

//copy other images to img folder
gulp.task("other-images", function() {
  return gulp
    .src(["!images/**/*.jpg", "images/**/*.*"])
    .pipe(gulp.dest("img/"));
});

// clean img folder
gulp.task("clean", function(done) {
  return del(["img/"], done);
});

// run this task for images
gulp.task("images", function(done) {
  runSequence("clean", ["jpg-images", "other-images"], done);
});
