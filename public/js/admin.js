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
        window.location.href = '/account/edit/' + postId;
      });
    },
    delete: function () {

    }
  }
})();

admin.init();