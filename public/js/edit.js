/**
 * Created by minyi on 2016/11/23.
 */
$('#postMarkdown').on('input', function () {
    var val = $(this).val();
    $('#showBar').html(marked(val));
});