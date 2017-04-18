/**
 * Created by hasee on 2017/4/16.
 */
require('./index.scss')
$(function () {
    var created_num = 0;
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
        ++created_num
        var str = '<div class="created_div" id="created_div_'+created_num+'">'+created_num+'</div>'
        $('#add_cut').before(str)
        var str_right = "";
        str_right += "<div class=\"contrl\">\n";
        str_right += "            <div class=\"num\">"+"编号:"+created_num+"<\/div>\n";
        str_right += "            <div class=\"contrl_style\">\n";
        str_right += "                <span>background:<\/span>\n";
        str_right += "                <input type=\"text\">\n";
        str_right += "            <\/div>\n";
        str_right += "        <\/div>\n";
        $('.left_contrl').append(str_right)
    })
    $('#cut').on('click',function () {
        --created_num
        $('#add_cut').prev().remove()
    })
    $(document).on('click','.created_div', function () {
        console.log(this.style )
    })




})
