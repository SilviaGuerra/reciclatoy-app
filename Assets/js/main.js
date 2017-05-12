//Funcionamiento de desaparecer basura

$(document).ready(function(){
  // $('.modal').modal();
  var addEvent = (function () {
    if (document.addEventListener) {
      return function (el, type, fn) {
        if (el && el.nodeName || el === window) {
          el.addEventListener(type, fn, false);
        } else if (el && el.length) {
          for (var i = 0; i < el.length; i++) {
            addEvent(el[i], type, fn);
          }
        }
      };
    } else {
      return function (el, type, fn) {
        if (el && el.nodeName || el === window) {
          el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
        } else if (el && el.length) {
          for (var i = 0; i < el.length; i++) {
            addEvent(el[i], type, fn);
          }
        }
      };
    }
  })();

  (function () {

    var pre = document.createElement('pre');
    pre.id = "view-source"

    // private scope to avoid conflicts with demos
    addEvent(window, 'click', function (event) {
      if (event.target.hash == '#view-source') {
        // event.preventDefault();
        if (!document.getElementById('view-source')) {
          pre.innerHTML = ('<!DOCTYPE html>\n<html>\n' + document.documentElement.innerHTML + '\n</html>').replace(/[<>]/g, function (m) { return {'<':'&lt;','>':'&gt;'}[m]});
          document.body.appendChild(pre);
        }
        document.body.className = 'view-source';

        var sourceTimer = setInterval(function () {
          if (window.location.hash != '#view-source') {
            clearInterval(sourceTimer);
            document.body.className = '';
          }
        }, 200);
      }
    });

  })();


  var eat = ['yum!', 'gulp', 'burp!', 'nom'];
  var yum = document.createElement('p');
  var msie = /*@cc_on!@*/0;
  yum.style.opacity = 1;

  var links = document.querySelectorAll('li > a'), el = null;
  for (var i = 0; i < links.length; i++) {
    el = links[i];

    el.setAttribute('draggable', 'true');

    addEvent(el, 'dragstart', function (e) {
      e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
      e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
    });
  }

  var organic = $(".trash");

  addEvent(organic, 'dragover', function (e) {
    if (e.preventDefault) e.preventDefault(); // allows us to drop
      //this.className = 'over';
      e.dataTransfer.dropEffect = 'copy';
      return false;
    });

    // to get IE to work
    addEvent(organic, 'dragenter', function (e) {
      return false;
    });

    addEvent(organic, 'dragleave', function () {
    });

    var puntaje = 0;
    var huellitas = 3;

    addEvent(organic, 'drop', function (e) {
      if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
        var el = document.getElementById(e.dataTransfer.getData('Text'));

        console.log($(el).attr("class"));
        console.log($(e.toElement.parentElement).attr("id"));

        // function contador(elem){
          if($(el).attr("class") == $(e.toElement.parentElement).attr("id")){
            //puntaje.innerHTML += 10;
            puntaje += 10;
            $("#score").html(puntaje + " Pts");
          }else if($(el).attr("class") != $(e.toElement.parentElement).attr("id")){
            $(".vidas > img").last().remove();
              if($(".vidas > img").length <= 0){
                alert(":(");
              }
            length()

          }

        el.parentNode.removeChild(el);

        // stupid nom text + fade effect
        organic.className = '';
        yum.innerHTML = eat[parseInt(Math.random() * eat.length)];

        var y = yum.cloneNode(true);

        organic.appendChild(y);

        setTimeout(function () {
          var t = setInterval(function () {
            if (y.style.opacity <= 0) {
              if (msie) { // don't bother with the animation
                y.style.display = 'none';
              }
              clearInterval(t);
            } else {
              y.style.opacity -= 0.1;
            }
          }, 50);
        }, 250);

        return false;
      });

});

$(".refresh").click(function(){
  location.reload();
});
