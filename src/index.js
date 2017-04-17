/**
 * Created by hasee on 2017/4/16.
 */
require('./index.scss')
$(function () {
    $('#pc').on('click',function () {
        $('.create').css({
            width:'70%'
        })
        $('.create').html('')
    })
    $('#mobile').on('click',function () {
        $('.create').css({
            width:'50%'
        })
        $('.create').html('')
    })
    $('#add').on('click',function () {
        var str = '<div class="created_div"></div>'
        $('#add_cut').before(str)
    })
    $(document).on('click','.created_div', function () {
        console.log(this.style )
        console.log($(this).css)

    })




})
