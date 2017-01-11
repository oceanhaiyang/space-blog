/**
 * Created by minyi on 2016/11/23.
 */

var edit = (function () {
    var $postMarkdown = $('#postMarkdown');
    var $showBar = $('#showBar');
    var imagesLen = 0;
    var imgReg = /\!\[\]\(\)/g;
    return {
        init: function () {
            var self = this;
            self.__toMarkDown();
            self.__switchMarkdown();
            self.__submitPost();
        },
        __toMarkDown: function () {
            var self = this;
            $postMarkdown.on('input', function () {
                self.__switchMarkdown();
            }).on('change', function () {
                self.__switchMarkdown();
            });
        },
        __switchMarkdown: function () {
            var self = this;
            var val = $postMarkdown.val();
            $('#showBar').html(marked(val));
            self.__imgCtrl();
        },
        __submitPost: function () {
            var method, articleId;
            articleId = Url.queryString('id');

            if ($('body').attr('update') === 'update') {
                method = 'PUT';
            } else {
                method = 'POST';
            }
            $('#submitBtn').on('click', function () {
                $.ajax({
                    url: '/account/edit?id=' + articleId,
                    type: method,
                    data: $('#postForm').serialize(),
                    success: function (json) {
                        if (json.ok) {
                            window.location.href = '/';
                        }
                    }
                })
            });
        },
        __imgCtrl: function () {
            var self = this;
            var $images = $showBar.find('img');
            if ($images.length < imagesLen) {
                return;
            }
            imagesLen = $images.length;
            var $imgWrapper = $images.parents('p');
            var $input = $('<input type="file" class="img-input" name="file" multiple="multiple"/>');

            $imgWrapper.addClass('img-wrapper');
            $imgWrapper.append($input);

            self.__imgSubmit();
        },
        __imgSubmit: function () {
            var $images = $showBar.find('.img-input');
            var text = $('#postMarkdown').val();

            $images.on('change', function () {
                var formData = new FormData();
                formData.append('file', $(this)[0].files[0]);
                $.ajax({
                    url: '/api/img_upload',
                    type: 'POST',
                    cache: false,
                    data: formData,
                    processData: false,
                    contentType: false
                }).done(function(res) {
                    $('#imgUrl').text(res);
                }).fail(function(res) {
                    console.log(res);
                });
            })
        }
    }
})();


edit.init();