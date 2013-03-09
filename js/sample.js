var slide = {
    cur: 0,
    count: 0,
    timeout_countdown: null,
    img_num: null
};

var image_loc = new Array();

function show_image(num) {
    var img = document.getElementById('image_show_0');
    var div = document.getElementById('image_show_box_0');
    div.onclick = close_image_show;
    img.src = image_loc[num];
    div.style.display = 'block';
    transition(img, 0, 1, 0.08, 4, 
        function(element, count){
            element.style.opacity=count
        }, 
        function(){

        }
    );
    transition(div, 0, 0.5, 0.04, 4, 
        function(element, count){
            element.style.backgroundColor="rgba(0, 0, 0, " + count + ")";
        },
        function(){

        }
    );
}

function close_image_show(){
    var img = document.getElementById('image_show_0');
    var div = document.getElementById('image_show_box_0');
    div.onclick = null;
    transition(img, 1, 0, 0.08, 5, 
        function(element, count){
            element.style.opacity=count
        },
        function(){
            img.src = null;
            div.style.display = 'none';
        }
    );
    transition(div, 0.5, 0, 0.04, 5, 
        function(element, count){
            element.style.backgroundColor="rgba(0, 0, 0, " + count + ")";
        },
        function(){

        }
    );
}

function gallery(){
    clearInterval(slide.timeout_countdown);
    var gal = document.getElementById('button_gal');
    var sls = document.getElementById('button_sls');
    sls.style.backgroundColor = '';
    gal.style.backgroundColor = '#FFD700';

    gal = document.getElementById('gallery_0');
    var sls_0 = document.getElementById('slide_show_0');
    var sls_1 = document.getElementById('slide_show_1');
    gal.style.display = 'block';
    sls_0.style.display = 'none';
    sls_1.style.display = 'none';
}

function next(count){
    return (count + 1) % image_loc.length;
}

function slide_show(){
    clearInterval(slide.timeout_countdown);
    slide.count = 0;
    slide.cur = 0;

    var gal = document.getElementById('button_gal');
    var sls = document.getElementById('button_sls');
    gal.style.backgroundColor = '';
    sls.style.backgroundColor = '#FFD700';

    gal = document.getElementById('gallery_0');
    var sls_0 = document.getElementById('slide_show_0');
    var sls_1 = document.getElementById('slide_show_1');
    sls_0.style.display = 'block';
    sls_1.style.display = 'block';
    gal.style.display = 'none';

    var img_show_1 = document.getElementById('image_show_1');
    var img_show_2 = document.getElementById('image_show_2');
    img_show_1.src = image_loc[0];
    img_show_2.src = '';
    transition(img_show_1, 0, 1, 0.05, 10, function(element, count){element.style.opacity=count}, function(){
        slide.timeout_countdown = setInterval(function(){
            transition(img_show_1, 1, 0, 0.1, 25, function(element, count){element.style.opacity=count}, function(){});
            slide.count = next(slide.count);
            img_show_2.src = image_loc[slide.count];
            transition(img_show_2, 0, 1, 0.05, 25, function(element, count){element.style.opacity=count}, function(){
                img_show_1.src = image_loc[slide.count];
                img_show_1.style.opacity = 1;
                img_show_2.src = '';
            });
        }, 5000);

    });
}

function transition(element, init_opp, final_opp, unit_opp_change, unit_time, set_count, callback){
    var count = init_opp;
    set_count(element, count);
    var inc = final_opp > init_opp ? 1 : 0;
    unit_opp_change = inc == 1 ? unit_opp_change : -unit_opp_change; 

    var interval = setInterval(function(){
        var end = false;
        count += unit_opp_change;
        if (inc == 1){
            if (count >= final_opp){
                count = final_opp;
                end = true;
            }
        }else{
            if (count <= final_opp){
                count = final_opp;
                end = true;
            }
        }

        set_count(element, count);
        if (end){
            clearInterval(interval);
            callback();
        }
    }, unit_time);
}
function init(){ 
    var gallery = document.getElementById('gallery_0');
    for (var i = 0; i < gallery.childElementCount - 1; i++) {
        var image_box = gallery.children[i];
        var image = image_box.children[0];
        image_loc.push(image.src);
    }
}
init();
gallery();
