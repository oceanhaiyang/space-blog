/**
 * Created by minyi on 2016/12/22.
 */
var admin = (function () {
  return {
    init: function () {
      var self = this;

      self.update();
    },
    update: function (postId) {
      var self = this;
      $('._update').on('click', function () {
        var postId = $(this).parent().parent().attr('id');
        console.log(postId);
        window.location.href = '/account/edit?id=' + postId;
      });
    },
  }
})();

admin.init();