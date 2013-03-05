var slide = {
    cur: 0,
    count: 0,
    timeout_countdown: null,
    img_num: null
};

function show_image(num) {
    var img = document.getElementById('image_show_0');
    var div = document.getElementById('image_show_box_0');
    img.src = image_loc[num];
    div.style.display = 'block';
    transition(img, 0, 1, 0.02, 10, function(){});
}

function gallary(){
    clearInterval(slide.timeout_countdown);
    var gal = document.getElementById('button_gal');
    var sls = document.getElementById('button_sls');
    sls.style.backgroundColor = '';
    gal.style.backgroundColor = '#FFD700';

    var gal = document.getElementById('gallary_0');
    var sls = document.getElementById('slide_show_0');
    gal.style.display = 'block';
    sls.style.display = 'none';
}

function slide_show(){
    clearInterval(slide.timeout_countdown);
    slide.count = 0;
    slide.cur = 0;
    
    var gal = document.getElementById('button_gal');
    var sls = document.getElementById('button_sls');
    gal.style.backgroundColor = '';
    sls.style.backgroundColor = '#FFD700';

    var gal = document.getElementById('gallary_0');
    var sls = document.getElementById('slide_show_0');
    sls.style.display = 'block';
    gal.style.display = 'none';

    var img_show = document.getElementById('image_show_1');
    img_show.src = image_loc[slide.count];

    slide.timeout_countdown = setInterval(function(){
            transition(img_show, 1, 0, 0.02, 10, function(){
                slide.count = (slide.count + 1) % image_loc.length
                img_show.src = image_loc[slide.count];
                transition(img_show, 0, 1, 0.02, 10, function(){});
            });
        }, 3000);
}

function transition(img, init_opp, final_opp, unit_opp_change, unit_time, callback){
    var count = init_opp;
    img.style.opacity = count;
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

        img.style.opacity = count;
        if (end){
            clearInterval(interval);
            callback();
        }
    }, unit_time);
}

for (var i = 0; i < image_loc.length; i++) {
    var img = document.getElementById('image_' + i);
    img.src = image_loc[i];
}
gallary();