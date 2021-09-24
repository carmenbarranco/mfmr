(function () {
  'use strict';

  window.Copper={};

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var BrowserDetection =
  /*#__PURE__*/
  function () {
    function BrowserDetection(minVersions) {
      _classCallCheck(this, BrowserDetection);

      //The minimum supported browser version 
      this.minVersions = Object.assign({
        chrome: 58,
        edge: 14,
        firefox: 54,
        safari: 10,
        opera: 55
      }, minVersions);
      var ua = navigator.userAgent,
          tem,
          M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      console.log(ua); //Array(name, version)

      this.navigator = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        this.navigator = ['ie', tem[1] || ''];
      }

      if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) this.navigator = [tem[1], tem[2].replace('OPR', 'Opera')];
      }

      if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        this.navigator.splice(1, 1, tem[1]); //      this.navigator = M;
      }
    }

    _createClass(BrowserDetection, [{
      key: "isSupported",
      value: function isSupported() {
        var navigator = this.navigator[0].toLowerCase();
        this.isSupported = !!this.minVersions[navigator] && this.navigator[1] >= this.minVersions[navigator];
        var str = this.isSupported ? "is" : "isn't";
        console.log("".concat(this.navigator, " ").concat(str, " supported (min version supported is ").concat(this.minVersions[navigator], ")"));
        return this.isSupported;
      }
    }, {
      key: "is",
      value: function is(navigator) {
        return navigator.toLowerCase() === this.navigator[0].toLowerCase();
      }
    }, {
      key: "isFirefox",
      value: function isFirefox() {
        return this.is('firefox');
      }
    }, {
      key: "isChrome",
      value: function isChrome() {
        return this.is('chrome');
      }
    }, {
      key: "isSafari",
      value: function isSafari() {
        return this.is('safari');
      }
    }, {
      key: "isOpera",
      value: function isOpera() {
        return this.is('opera');
      }
    }, {
      key: "isEdge",
      value: function isEdge() {
        return this.is('edge');
      }
    }, {
      key: "isIe",
      value: function isIe() {
        return this.is('ie');
      }
    }]);

    return BrowserDetection;
  }();

  var Easing = function Easing() {
    _classCallCheck(this, Easing);
  };

  Easing.linear = function (t) {
    return t;
  };

  var Animation =
  /*#__PURE__*/
  function () {
    function Animation(options) {
      _classCallCheck(this, Animation);

      this.target = options.target;
      delete options.target;
      this.options = Object.assign({}, {
        duration: 500,
        delay: 0,
        easing: 'linear'
      }, options); //time

      this.raf = null;
      this.t = {
        start: null,
        progress: 0 //properties

      };
      this.props = Object.keys(this.options).filter(function (value) {
        return -1 !== ['x', 'y', 'r', 's', 'o'].indexOf(value);
      });
      this.transforms = {};

      for (var i = 0; i < this.props.length; i++) {
        var prop = this.props[i];
        this.transforms[prop] = this.options[prop];
        this.transforms[prop].slope = this.transforms[prop].end - this.transforms[prop].start;
        delete this.options[prop];
      }

      return this;
    }

    _createClass(Animation, [{
      key: "alternate",
      value: function alternate() {
        for (var i = 0; i < this.props.length; i++) {
          var prop = this.props[i];
          var s = this.transforms[prop].start;
          this.transforms[prop].start = this.transforms[prop].end;
          this.transforms[prop].end = s;
          this.transforms[prop].slope = this.transforms[prop].end - this.transforms[prop].start;
        }

        return this;
      }
    }, {
      key: "play",
      value: function play() {
        this.raf = requestAnimationFrame(this.animate.bind(this)); //    console.log('started', this.raf)
      }
    }, {
      key: "stop",
      value: function stop() {
        cancelAnimationFrame(this.raf); //    console.log('stopped', this.raf)

        this.raf = null;
      }
    }, {
      key: "delay",
      value: function delay() {
        var _this = this;

        setTimeout(function () {
          _this.play();
        }, this.options.delay);
      }
    }, {
      key: "animate",
      value: function animate(t) {
        this.t.start || (this.t.start = t);
        this.t.current = t - this.t.start;

        if (this.t.progress + 0.000001 < 1) {
          this.t.progress = Math.min(this.t.current / this.options.duration, 1);
          this.update();
          requestAnimationFrame(this.animate.bind(this));
        } else {
          this.update();
          this.stop();
          this.options.cb && this.options.cb();
        }
      }
    }, {
      key: "interpolate",
      value: function interpolate(p) {
        var e = Easing[this.options.easing](this.t.progress);
        return p.start + p.slope * e;
      }
    }, {
      key: "update",
      value: function update() {
        var css = [];

        for (var i = 0; i < this.props.length; i++) {
          var prop = this.props[i];
          this.transforms[prop].current = this.interpolate(this.transforms[prop]);
        }

        if (this.transforms['x'] || this.transforms['y']) {
          var x = this.transforms['x'] ? this.transforms['x'] : {
            current: 0,
            unit: ''
          };
          var y = this.transforms['y'] ? this.transforms['y'] : {
            current: 0,
            unit: ''
          };
          css.push("translate3d(".concat(x.current).concat(x.unit, ", ").concat(y.current).concat(y.unit, ", 0)"));
        }

        if (this.transforms['r']) css.push("rotate(".concat(this.transforms['r'].current, "deg)"));
        if (this.transforms['s']) css.push("scale(".concat(this.transforms['s'].current, ")"));
        if (css.length > 0) this.target.style.transform = css.join(' ');
        if (this.transforms['o']) this.target.style.opacity = this.transforms['o'].current;
      }
    }]);

    return Animation;
  }(); //import Easing from './Easing.js'

  var Menu =
  /*#__PURE__*/
  function () {
    function Menu(router) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Menu);

      var menu = document.getElementById('menu');
      var targets = document.querySelectorAll('#menu .anim');
      var app = document.getElementById('app');
      this.router = router;
      this.options = Object.assign({}, {
        button: '#toggle-menu',
        links: '#menu .item'
      }, options);
      this.opened = false;
      this.t11 = [];
      this.t11.push(new Animation({
        target: menu,
        o: {
          start: 0,
          end: 1
        },
        duration: 300,
        delay: 0
      }));

      for (var i = 0; i < targets.length; i++) {
        this.t11.push(new Animation({
          target: targets[i],
          y: {
            start: 100,
            end: 0,
            unit: '%'
          },
          duration: 250,
          delay: 100 + i * 50
        }));
      }

      this.t11.push(new Animation({
        target: loader,
        o: {
          start: 1,
          end: 0
        },
        duration: 300
      }));
      this.t12 = this.reverse(this.t11); //Events

      this.button.addEventListener('click', this.toggle.bind(this));
    }

    _createClass(Menu, [{
      key: "toggle",
      value: function toggle() {
        if (this.opened) this.close();else this.open();
      }
    }, {
      key: "open",
      value: function open() {
        var _this = this;

        this.play(this.t11, function () {
          //add event listeners
          _this.router.addListeners(_this.links);

          _this.opened = true;
        });
      }
    }, {
      key: "close",
      value: function close() {
        var _this2 = this;

        this.play(this.t12, function () {
          //remove event listeners
          _this2.router.removeListeners(_this2.links);

          _this2.opened = false;
        });
      }
    }, {
      key: "reverse",
      value: function reverse(t) {
        var r = [];
        for (var i = t.length; i > 0; --i) {
          var clone = Object.assign(Object.create(t[i - 1]), t[i - 1]);
          r[t.length - 1 - i] = clone.alternate();
        }
      }
    }, {
      key: "play",
      value: function play(t, cb) {
        var length = this[t].length;
        if (cb) {
          this[t][length - 1].options.cb = cb;
        }

        for (var i = 0; i < length; i++) {
          var anim = this[t][i];
          if (anim.options.delay) anim.delay();else anim.play();
        }
      }
    }, {
      key: "button",
      get: function get() {
        return document.querySelector(this.options.button);
      }
    }, {
      key: "links",
      get: function get() {
        return document.querySelectorAll(this.options.links);
      }
    }]);
    return Menu;
  }();

  var Router =
  /*#__PURE__*/
  function () {
    function Router() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Router);

      this.options = Object.assign({}, {
        root: '/'
      }, options);
      this.routes = []; //Events

      this.addListeners();
      window.onpopstate = this.onPopstate.bind(this); //Plugins
      this.plugins = []; //this.plugins.push(new Menu(this))
      return this;
    }

    _createClass(Router, [{
      key: "addListeners",
      value: function addListeners(tgs) {
        var targets = tgs || this.links;

        for (var i = 0; i < targets.length; i++) {
          targets[i].addEventListener('click', this.onClick.bind(this));
        }
      }
    }, {
      key: "removeListeners",
      value: function removeListeners(tgs) {
        var targets = tgs || this.links;

        for (var i = 0; i < targets.length; i++) {
          targets[i].removeEventListener('click', this.onClick.bind(this));
        }
      }
    }, {
      key: "onClick",
      value: function onClick(e) {
        console.log('click');
        var path = e.target.getAttribute('href');
        var referer = window.location.pathname;
        var state = {
          path: path,
          referer: referer
        };

        if (path !== referer) {
          this.match(state);
          history.pushState(state, '', path);
        }

        return e.preventDefault() && e.stopImmediatePropagation();
      }
    }, {
      key: "onPopstate",
      value: function onPopstate(e) {
        //    console.log('popstate', e, e.state, e.path)
        this.match(e.state);
      }
    }, {
      key: "match",
      value: function match(state) {
        var path = Object.keys(this.routes).includes(state.path) ? state.path : 404;
        this.routes[path].apply(null, [state, this]);
        return path !== 404;
      }
    }, {
      key: "init",
      value: function init(state) {
        this.match(state);
        history.replaceState(state, '', state.path);
      }
    }, {
      key: "add",
      value: function add(path, callback) {
        if (typeof path === 'function') {
          callback = path;
          path = 404;
        }
        this.routes[path] = callback;
        return this;
      }
    }, {
      key: "links",
      get: function get() {
        return document.querySelectorAll(this.options.links);
      }
    }]);
    return Router;
  }();

  function post(uri) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(data)
    }).then(function (r) {
      return r.json();
    });
  }
  /**
   * La fonction debounce permet de déclencher l'appel à une fonction après un certain délai (un peu comme la fonction setTimeout()) mais permet en plus de réinitialiser le timer si on demande une nouvelle exécution dans un intervalle de temps plus court que le délai. Par exemple, on peut écouter la frappe d'un utilisateur dans un champ texte, mais ne pas vouloir appeler notre callback seulement si l'utilisateur marque une pause suffisamment longue.
   * @param {[[type]]} callback [[Description]]
   * @param {[[type]]} delay [[Description]]
   * @return {[[type]]} [[Description]]
   */

  function debounce(callback, delay) {
    var timer;
    return function () {
      var args = arguments;
      var context = this;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, delay);
    };
  }

  var Loader =
  /*#__PURE__*/
  function () {
    function Loader() {
      _classCallCheck(this, Loader);

      var loader = document.getElementById('loader');
      var back = document.querySelector('#loader .mfmr');
      var targets = document.querySelectorAll('#loader .anim');
      var app = document.getElementById('app');
      this.t1 = [];
      this.t1.push(new Animation({
        target: back,
        o: {
          start: 0,
          end: 1
        },
        duration: 300,
        delay: 0
      }));

      for (var i = 0; i < targets.length; i++) {
        this.t1.push(new Animation({
          target: targets[i],
          y: {
            start: 100,
            end: 0,
            unit: '%'
          },
          duration: 250,
          delay: 100 + i * 15
        }));
      }

      this.t1.push(new Animation({
        target: loader,
        o: {
          start: 1,
          end: 0
        },
        duration: 500,
        delay: 800 + 15 * targets.length
      })); //xhr open

      var loader2 = document.getElementById('loader2');
      this.t21 = [new Animation({
        target: loader2,
        o: {
          start: 0,
          end: 1
        },
        duration: 300,
        delay: 0
      })]; //xhr close

      this.t22 = [new Animation({
        target: loader2,
        o: {
          start: 1,
          end: 0
        },
        duration: 300,
        delay: 0
      })];
    }

    _createClass(Loader, [{
      key: "play",
      value: function play(t, cb) {
        var length = this[t].length;
        if (cb) {
          this[t][length - 1].options.cb = cb;
        }

        for (var i = 0; i < length; i++) {
          var anim = this[t][i];
          if (anim.options.delay) anim.delay();else anim.play();
        }
      }
    }]);

    return Loader;
  }();

  var CarouselTouchPlugin =
  /*#__PURE__*/
  function () {
    function CarouselTouchPlugin(carousel) {
      var _this = this;

      _classCallCheck(this, CarouselTouchPlugin);

      this.translate = {
        x: null,
        y: null
      };
      this.dragging = false;
      this.carousel = carousel;
      /*
       * Html
       */

      this.carousel.items.forEach(function (item) {
        var video = item.getElementsByTagName('video')[0];

        if (!video) {
          return;
        }

        item.addEventListener('click', function (e) {
          e.stopPropagation();
          e.preventDefault();
        });
      });
      this.carousel.onMove(function (index) {
        var videos = _this.carousel.root.getElementsByTagName('video');

        if (!videos.length) return;
        Array.from(videos).forEach(function (video) {
          if (!video.paused) video.pause();
        });
      });
      /*
       * Events
       */
      //Bloquer le drag des images

      carousel.element.addEventListener('dragstart', function (e) {
        return e.preventDefault();
      });
      carousel.element.addEventListener('mousedown', this.startDrag.bind(this));
      carousel.element.addEventListener('touchstart', this.startDrag.bind(this), {
        passive: true
      });
      window.addEventListener('mousemove', this.drag.bind(this), {
        passive: false
      });
      window.addEventListener('touchmove', this.drag.bind(this), {
        passive: false
      });
      window.addEventListener('touchend', this.endDrag.bind(this));
      window.addEventListener('touchcancel', this.endDrag.bind(this));
      window.addEventListener('mouseup', this.endDrag.bind(this));
    }
    /**
     * Démarre le déplacement au touché
     * @param {MouseEvent|TouchEvent} e
     */


    _createClass(CarouselTouchPlugin, [{
      key: "startDrag",
      value: function startDrag(e) {
        if (e.touches) if (e.touches.length > 1) return;else e = e.touches[0];
        this.origin = {
          x: e.screenX,
          y: e.screenY
        };
        this.width = this.carousel.containerWidth;
        this.carousel.disableTransition();
        console.log('start drag');
      }
      /**
       * Déplacement
       * @param {MouseEvent|TouchEvent} e
       */

    }, {
      key: "drag",
      value: function drag(e) {
        if (this.origin) {
          var point = e.touches ? e.touches[0] : e;
          this.translate = {
            x: point.screenX - this.origin.x,
            y: point.screenY - this.origin.y //      console.log(this.isDragging, this.translate)
            //Cancel event if the aim is to slide the carousel

          };

          if (this.isDragging && e.touches) {
            //        this.dragging = true
            e.preventDefault();
            e.stopPropagation();
          }

          var baseTranslate = -100 * this.carousel.currentItem / this.carousel.items.length;
          this.lastTranslate = this.translate;
          this.carousel.translate(baseTranslate + 100 * this.translate.x / this.width);
        }
      }
      /**
       * Fin du déplacement
       * @param {MouseEvent|TouchEvent} e
       */

    }, {
      key: "endDrag",
      value: function endDrag(e) {
        if (this.origin && this.lastTranslate) {
          console.log(Math.abs(this.lastTranslate.x / this.carousel.carouselWidth));
          this.carousel.enableTransition();

          if (this.isDragging && e.touches) {
            e.preventDefault();
            e.stopPropagation();
          }

          if (Math.abs(this.lastTranslate.x / this.carousel.carouselWidth) > 0.2) {
            if (this.lastTranslate.x < 0) this.carousel.next();else this.carousel.prev();
          } else this.carousel.goToItem(this.carousel.currentItem);
        }

        this.origin = null;
        this.lastTranslate = null;
        this.translate = {
          x: null,
          y: null
        };
        this.dragging = false;
      } //  set isDragging(value){
      //    this.dragging = value
      //  }

    }, {
      key: "isDragging",
      get: function get() {
        var current = this.dragging;
        if (this.dragging || Math.abs(this.translate.x) > Math.abs(this.translate.y)) this.dragging = true;
        return current;
      }
    }]);

    return CarouselTouchPlugin;
  }();

  var Carousel =
  /*#__PURE__*/
  function () {
    /**
     * @param {HTMLElement} element
     * @param {Object} options
     * @param {Object} [options.slidesToScroll=1]   Number of slides to scroll
     * @param {Object} [options.slidesVisible=1]    Number of slides to display
     * @param {boolean}[options.loop=false]         Doit-on boucler en fin de carousel?
     * @param {boolean}[options.navigation=true]    Naviger?
     * @param {boolean}[options.pagination=false]   Paginer?
     * @param {boolean}[options.infinite=false]     Défilement infini?
     */
    function Carousel(element) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Carousel);

      this.element = element;
      this.options = Object.assign({}, {
        slidesToScroll: 1,
        slidesVisible: 1,
        loop: false,
        navigation: true,
        pagination: false,
        infinite: false
      }, options);
      if (this.options.loop && this.options.infinite) throw new Error('Un carousel ne peut être à la fois en boucle est en infini');
      this.isMobile = true;
      this.currentItem = 0;
      this.moveCallbacks = [];
      this.offset = 0;
      /**
       * DOM manipulation 
       */

      this.root = this.createDivWithClass('carousel'); //    this.root.setAttribute('tabindex', '0')

      this.container = this.createDivWithClass('carousel__container'); //[].slice.call create an array from NodeList (pseudo array) this.element.children which is dynamic

      var children = [].slice.call(this.element.children);
      this.root.appendChild(this.container);
      this.element.appendChild(this.root);
      this.items = children.map(function (child) {
        var item = _this2.createDivWithClass('carousel__item');

        item.appendChild(child);
        return item;
      });

      if (this.options.infinite) {
        this.offset = this.options.slidesVisible + this.options.slidesToScroll;
        if (this.items > children.length) console.error("Vous n'avez pas assez d'éléments dans le carousel", element);
        this.items = [].concat(_toConsumableArray(this.items.slice(this.items.length - this.offset).map(function (item) {
          return item.cloneNode(true);
        })), _toConsumableArray(this.items), _toConsumableArray(this.items.slice(0, this.offset).map(function (item) {
          return item.cloneNode(true);
        })));
        this.goToItem(this.offset, false);
      }

      this.items.forEach(function (item) {
        return _this2.container.appendChild(item);
      });
      this.setStyle();
      if (this.options.navigation) this.createNavigation();
      if (this.options.pagination) this.createPagination();
      /**
       * Evenements 
       */

      this.onWindowResize(); //Launch moveCallbacks

      this.moveCallbacks.forEach(function (cb) {
        return cb(_this2.currentItem);
      }); //Launch resize event handler => responsive

      window.addEventListener('resize', this.onWindowResize.bind(this)); //Keyboard navigation

      this.root.addEventListener('keyup', function (e) {
        if (e.key === 'ArrowLeft' || e.key === 'Left') _this2.prev();else if (e.key === 'ArrowRight' || e.key === 'Right') _this2.next();
      }); //Move the slides without animation whan necessary

      if (this.options.infinite) this.container.addEventListener('transitionend', this.resetInfinite.bind(this)); //Drag & drop plugin

      new CarouselTouchPlugin(this);
    }
    /**
     * Applique les bonnes dimension au carousel en % en pas en pixel 
     * si en pixel : il faut ecouter les resize pour màj de la taille en px
     * si en % : le navigateur doit choisir comment rendre les 1/2 px => plus facile et performant
     */


    _createClass(Carousel, [{
      key: "setStyle",
      value: function setStyle() {
        var _this3 = this;

        var ratio = this.items.length / this.slidesVisible;
        this.container.style.width = ratio * 100 + '%';
        this.items.forEach(function (item) {
          item.style.width = 100 / _this3.slidesVisible / ratio + '%';
        });
      }
    }, {
      key: "createPagination",
      value: function createPagination() {
        var _this4 = this;

        var pagination = this.createDivWithClass('carousel__pagination');
        var buttons = [];
        this.root.appendChild(pagination);

        var _loop = function _loop(i) {
          var button = _this4.createDivWithClass('carousel__pagination__button');

          button.addEventListener('click', function () {
            return _this4.goToItem(i + _this4.offset);
          });
          pagination.appendChild(button);
          buttons.push(button);
        };

        for (var i = 0; i < this.items.length - 2 * this.offset; i += this.options.slidesToScroll) {
          _loop(i);
        }

        this.onMove(function (index) {
          var count = _this4.items.length - 2 * _this4.offset;
          var activeButton = buttons[Math.floor((index - _this4.offset) % count / _this4.options.slidesToScroll)];

          if (activeButton) {
            buttons.forEach(function (button) {
              return button.classList.remove('carousel__pagination__button--active');
            });
            activeButton.classList.add('carousel__pagination__button--active');
          }
        });
      }
    }, {
      key: "createNavigation",
      value: function createNavigation() {
        var _this5 = this;

        var nextButton = this.createDivWithClass('carousel__next');
        var prevButton = this.createDivWithClass('carousel__prev');
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
        if (this.options.loop === true) return;
        this.onMove(function (index) {
          //Prev button
          if (index === 0) prevButton.classList.add('carousel__prev--hidden');else prevButton.classList.remove('carousel__prev--hidden'); //Next button

          if (undefined === _this5.items[_this5.currentItem + _this5.slidesVisible]) nextButton.classList.add('carousel__next--hidden');else nextButton.classList.remove('carousel__next--hidden');
        });
      }
    }, {
      key: "next",
      value: function next() {
        this.goToItem(this.currentItem + this.slidesToScroll);
      }
    }, {
      key: "prev",
      value: function prev() {
        this.goToItem(this.currentItem - this.slidesToScroll);
      }
      /**
       * Déplace le carousel vers l'élément ciblé
       * @param {Number} index  
       */

    }, {
      key: "goToItem",
      value: function goToItem(index) {
        var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (index < 0) {
          if (!this.options.loop) return;
          index = this.items.length - this.slidesVisible;
        } else if (index >= this.items.length //Ou je vais à droite et il n'y a plus de slide après
        || index > this.currentItem && undefined === this.items[this.currentItem + this.slidesVisible]) {
          if (!this.options.loop) return;
          index = 0;
        }

        var x = -index * 100 / this.items.length;
        if (animate === false) this.disableTransition();
        this.translate(x);
        this.container.offsetHeight; //Force redraw

        if (animate === false) this.enableTransition(); //Reset the transition

        this.currentItem = index; //Launch moveCallbacks

        this.moveCallbacks.forEach(function (cb) {
          return cb(index);
        });
      }
    }, {
      key: "translate",
      value: function translate(percent) {
        this.container.style.transform = "translate3d(".concat(percent, "%, 0, 0)");
      }
    }, {
      key: "resetInfinite",
      value: function resetInfinite() {
        if (this.currentItem <= this.options.slidesToScroll) this.goToItem(this.currentItem + (this.items.length - 2 * this.offset), false);else if (this.currentItem >= this.items.length - this.offset) this.goToItem(this.currentItem - (this.items.length - 2 * this.offset), false);
      }
      /**
       * @callback moveCallback
       * @param {number} index
       */

      /**
       * @param {Carousel~moveCallback} cb
       */

    }, {
      key: "onMove",
      value: function onMove(cb) {
        this.moveCallbacks.push(cb);
      }
    }, {
      key: "onWindowResize",
      value: function onWindowResize() {
        var _this6 = this;

        var mobile = window.innerWidth < 600;

        if (mobile !== this.isMobile) {
          this.isMobile = mobile;
          this.setStyle(); //Launch moveCallbacks

          this.moveCallbacks.forEach(function (cb) {
            return cb(_this6.currentItem);
          });
        }
      }
      /**
       * @param {string} className
       * @returns {HTMLElement}
       */

    }, {
      key: "createDivWithClass",
      value: function createDivWithClass(className) {
        var div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
      }
    }, {
      key: "disableTransition",
      value: function disableTransition() {
        this.container.style.transition = 'none';
      }
    }, {
      key: "enableTransition",
      value: function enableTransition() {
        this.container.style.transition = '';
      }
      /**
       * @returns {number} 
       */

    }, {
      key: "slidesToScroll",
      get: function get() {
        return this.isMobile ? 1 : this.options.slidesToScroll;
      }
      /**
       * @returns {number} 
       */

    }, {
      key: "slidesVisible",
      get: function get() {
        return this.isMobile ? 1 : this.options.slidesVisible;
      }
      /**
       * @returns {number} 
       */

    }, {
      key: "containerWidth",
      get: function get() {
        return this.container.offsetWidth;
      }
      /**
       * @returns {number} 
       */

    }, {
      key: "carouselWidth",
      get: function get() {
        return this.root.offsetWidth;
      }
    }]);

    return Carousel;
  }();

  var Scroller =
  /*#__PURE__*/
  function () {
    function Scroller() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Scroller);

      this.target = document.querySelector(options.target);
      delete options.target;
      this.browser = options.browser;
      delete options.browser;
      this.options = Object.assign({}, {
        coef: 0.09,
        parallax: [{
          target: null,
          y: [],
          coef: 0
        }]
      }, options); //plugins

      this.plugins = [];
      this.plugins.push(new ScrollerLocation(this, '#scroller-location'));

      if (this.options.parallax) {
        this.plugins.push(new ScrollerParallax(this, this.options.parallax));
        delete this.options.parallax;
      }

      if (this.options.animations) {
        this.plugins.push(new ScrollerAnimation(this, this.options.animations));
        delete this.options.animations;
      }

      this.init(); //raf

      this.raf = null; //Events

      window.addEventListener('wheel', this.onWheel.bind(this));
      window.addEventListener('resize', debounce(this.onResize.bind(this), 100));
      window.addEventListener('touchstart', this.startDrag.bind(this), {
        passive: true
      });
      window.addEventListener('touchmove', this.drag.bind(this), {
        passive: true
      });
      window.addEventListener('touchend', this.endDrag.bind(this));
      window.addEventListener('touchcancel', this.endDrag.bind(this));
      return this;
    }

    _createClass(Scroller, [{
      key: "init",
      value: function init() {
        var _this = this;

        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        this.y = 0;
        this.current = 0;
        this.minY = 0;
        this.setMaxY();
        this.runPlugins('init');
        if (!force) return;
        var h = 0;
        var i = 0;
        var interval = setInterval(function () {
          _this.setMaxY();

          if (h === _this.maxY) i++;
          if (i === 2) clearInterval(interval);
          h = _this.maxY;
          console.log(_this.maxY);
        }, 2000);
      }
    }, {
      key: "startDrag",
      value: function startDrag(e) {
        if (e.touches) if (e.touches.length > 1) return;else e = e.touches[0];
        this.origin = {
          x: e.screenX,
          y: e.screenY
        };
        console.log('start drag');
      }
    }, {
      key: "drag",
      value: function drag(e) {
        if (this.origin) {
          if (e.touches.length > 1) return;
          var point = e.touches ? e.touches[0] : e; //@todo: lock horizontal movement on carousel

          this.translate = {
            x: point.screenX - this.origin.x,
            y: point.screenY - this.origin.y
          };
          this.lastPoint || (this.lastPoint = this.origin.y);
          this.moveBy = 3 * (point.screenY - this.lastPoint);
          this.moveY(-parseInt(this.moveBy));
          this.lastPoint = point.screenY;
        }
      }
    }, {
      key: "endDrag",
      value: function endDrag(e) {
        this.lastPoint = null;
      }
    }, {
      key: "onWheel",
      value: function onWheel(e) {
        /* https://github.com/jquery/jquery-mousewheel/issues/156 
         * Needed to get correct wheel event deltaY value:
         * body{ overflow: hidden; }
         * or 
         * e.preventDefault()
         */
        this.browser.isSafari() && e.preventDefault();
        var delta = -e.wheelDeltaY || e.deltaY;
        this.browser.isFirefox() && e.deltaMode === 1 && (delta *= 40); //    this.browser.isSafari() && (delta /= 2)

        this.moveY(parseInt(delta)); //    console.log(e.wheelDeltaY, e.deltaY, e.deltaMode, this.browser.isFirefox(), delta)
      }
    }, {
      key: "onResize",
      value: function onResize() {
        this.setMaxY();
        if (this.y > this.maxY) this.y = this.maxY;
        console.log('resize', Date.now());
      }
    }, {
      key: "scrollTo",
      value: function scrollTo(y) {
        var _this2 = this;

        var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
        var i = 0;
        var f = 1000 / 60;
        var c = d / f;
        var u = y / c;
        var id = setInterval(function () {
          _this2.moveY(u);

          if (++i >= c) clearInterval(id);
        }, f);
      }
    }, {
      key: "moveY",
      value: function moveY(y) {
        this.y += y; //    this.y += parseInt(y)

        if (this.y >= this.maxY) this.y = this.maxY;
        if (this.y < this.minY) this.y = this.minY;
      }
    }, {
      key: "setMaxY",
      value: function setMaxY() {
        var body = document.body,
            html = document.documentElement;
        this.maxY = -window.innerHeight + Math.max(this.target.offsetHeight, this.target.scrollHeight, body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      }
    }, {
      key: "start",
      value: function start() {
        this.setMaxY();
        this.raf = requestAnimationFrame(this.animate.bind(this));
      }
    }, {
      key: "stop",
      value: function stop() {
        cancelAnimationFrame(this.raf);
        this.raf = null;
      }
    }, {
      key: "animate",
      value: function animate() {
        if (Math.abs(this.current - this.y) > 0.01) this.current += (this.y - this.current) * this.options.coef;else this.current = this.y;
        this.target.style.transform = "translate3d(0, -".concat(this.current, "px, 0)"); //Animate plugins

        this.runPlugins('animate');
        requestAnimationFrame(this.animate.bind(this));
      }
    }, {
      key: "runPlugins",
      value: function runPlugins(fn) {
        for (var i = 0; i < this.plugins.length; i++) {
          this.plugins[i][fn] && this.plugins[i][fn]();
        }
      }
    }]);

    return Scroller;
  }();

  var ScrollerAnimation =
  /*#__PURE__*/
  function () {
    function ScrollerAnimation(scroller, animations) {
      _classCallCheck(this, ScrollerAnimation);

      this.scroller = scroller;
      this.animations = animations;

      for (var i = 0; i < this.animations.length; i++) {
        for (var j = 0; j < this.animations[i].targets.length; j++) {
          var tg = this.animations[i].targets[j];
          tg.rect = tg.target.getBoundingClientRect();
        }
      }
    }

    _createClass(ScrollerAnimation, [{
      key: "isVisible",
      value: function isVisible(r) {
        return this.scroller.y + window.innerHeight >= r.top && this.scroller.y <= r.bottom;
      }
    }, {
      key: "collide",
      value: function collide(r1, r2) {
        return; //@todo
      }
    }, {
      key: "trigger",
      value: function trigger(a) {
        var y1 = this.scroller.y - a.y[0];

        if (y1 > 0 && !a.triggered) {
          a.triggered = true;
          return true;
        }

        return false;
      }
    }, {
      key: "animate",
      value: function animate(t) {
        for (var i = 0; i < this.animations.length; i++) {
          if (this.trigger(this.animations[i])) this.update(this.animations[i]);
        }
      }
    }, {
      key: "update",
      value: function update(a) {
        var _loop = function _loop(j) {
          var tg = a.targets[j];

          tg.options.cb = function () {
            if (a.alternate) tg.alternate();
          };

          tg.play();
        };

        for (var j = 0; j < a.targets.length; j++) {
          _loop(j);
        }
      }
    }]);

    return ScrollerAnimation;
  }();

  var ScrollerParallax =
  /*#__PURE__*/
  function () {
    function ScrollerParallax(scroller, targets) {
      _classCallCheck(this, ScrollerParallax);

      this.scroller = scroller;
      this.targets = targets;
    }

    _createClass(ScrollerParallax, [{
      key: "init",
      value: function init() {
        for (var i = 0; i < this.targets.length; i++) {
          this.targets[i].el = document.querySelector(this.targets[i].target);

          if (this.targets[i].o) {
            this.targets[i].curve = {
              start: this.targets[i].o[0],
              end: this.targets[i].o[1],
              slope: (this.targets[i].o[1] - this.targets[i].o[0]) / (this.targets[i].y[1] - this.targets[i].y[0])
            };
          }
        }
      }
    }, {
      key: "animate",
      value: function animate(t) {
        for (var i = 0; i < this.targets.length; i++) {
          if (this.scroller.current >= this.targets[i].y[0] && this.scroller.current <= this.targets[i].y[1]) {
            this.update(this.targets[i]);
          }
        }
      }
    }, {
      key: "update",
      value: function update(tg) {
        if (tg.coef) {
          var p = (tg.y[0] - this.scroller.current) * tg.coef;
          tg.el.style.transform = "translate3d(0, ".concat(p, "px, 0)");
        }

        if (tg.o) {
          var o = tg.curve.start + tg.curve.slope * Math.min(Math.max(this.scroller.current - tg.y[0], 1), tg.y[1]);
          tg.el.style.opacity = o;
        }
      }
    }]);

    return ScrollerParallax;
  }();

  var ScrollerLocation =
  /*#__PURE__*/
  function () {
    function ScrollerLocation(scroller, target) {
      _classCallCheck(this, ScrollerLocation);

      this.scroller = scroller;
      this.target = document.querySelector(target);
      this.width = window.innerWidth;
      this.initStyle = this.target.style.transform;
    }

    _createClass(ScrollerLocation, [{
      key: "init",
      value: function init() {
        this.target.style.transform = this.initStyle;
      }
    }, {
      key: "animate",
      value: function animate(t) {
        var ratio = 100 - 100 * (this.scroller.current / this.scroller.maxY);
        this.target.style.transform = "translate3d(-".concat(ratio, "%, 0, 0)");
      }
    }]);

    return ScrollerLocation;
  }();

  var Controller =
  /*#__PURE__*/
  function () {
    function Controller(components) {
      _classCallCheck(this, Controller);

      this.components = components;
      this.loaded = false;
      this.loader = new Loader();
      this.scroller = new Scroller({
        target: '#page',
        browser: this.browser,
        parallax: [{
          target: 'header',
          y: [0, window.innerHeight],
          coef: -0.2
        }, {
          target: '.logo-inner',
          y: [0, window.innerHeight],
          coef: -0.1
        }, {
          target: '.discover',
          y: [0, window.innerHeight],
          coef: -0.1
        }, {
          target: '.logo-inner',
          y: [window.innerHeight / 3, window.innerHeight],
          o: [1, 0]
        }, {
          target: '.discover',
          y: [0, window.innerHeight],
          o: [1, 0]
        }]
      });
    }

    _createClass(Controller, [{
      key: "handle",
      value: function handle(request) {
        var _this = this;

        console.log('handle', request); //page load

        if (!this.loaded) {
          this.loaded = true;
          this.addCarousel();
          window.addEventListener('load', function () {
            console.log("All resources loaded 2!");

            _this.loader.play('t1', function () {
              _this.addDiscoverListener();

              _this.scroller.start();
            });
          });
        } else {
          this.loader.play('t21', function () {
            post(request.path).then(function (json) {
              _this.addHtml(json);

              _this.addCarousel();

              _this.addDiscoverListener();

              _this.router.addListeners(); //@todo
              //matthieu-x -> load video then remove loader
              //           -> mute sound on scroll
              //           -> display play button when video end
              //@todo: use lazy loading instead of force??


              _this.scroller.init('force');

              _this.loader.play('t22');
            });
          });
        }
      }
    }, {
      key: "handleError404",
      value: function handleError404(request) {
        var _this2 = this;

        console.log('404', request);

        if (!this.loaded) {
          var loader = document.getElementById('loader');
          loader.style.opacity = 0;
          this.loaded = true;
        } else {
          this.loader.play('t21', function () {
            post(request.path).then(function (json) {
              _this2.addHtml(json);

              _this2.scroller.init('force');

              _this2.loader.play('t22');
            });
          });
        }
      }
    }, {
      key: "addHtml",
      value: function addHtml(json) {
        console.log(json.title);
        document.title = json.title;
        document.querySelector('meta[name="description"]').setAttribute("content", json.description);
        document.getElementById('page').innerHTML = json.template;
      }
    }, {
      key: "addCarousel",
      value: function addCarousel() {
        //@todo: refactor carousel!!!
        //Home -> compagnie
        var i1 = document.getElementById('c1');
        if (i1 !== null) new Carousel(i1, {
          slidesToScroll: 3,
          slidesVisible: 3,
          infinite: true,
          navigation: true
        }); //spectacles

        var i2 = document.getElementById('c2');
        if (i2 !== null) new Carousel(i2, {
          slidesToScroll: 1,
          slidesVisible: 1,
          infinite: true,
          navigation: true
        });
      }
    }, {
      key: "addDiscoverListener",
      value: function addDiscoverListener() {
        var _this3 = this;

        //Attach discover listener
        document.querySelector('header .discover').addEventListener('mouseover', function (e) {
          if (_this3.scroller.y === 0) {
            //@todo: add to resize listener
            var y = document.querySelector('#pt').getBoundingClientRect().top;

            _this3.scroller.scrollTo(y);
          }
        });
      }
    }, {
      key: "router",
      get: function get() {
        return this.components.router;
      }
    }, {
      key: "browser",
      get: function get() {
        return this.components.browser;
      }
    }]);

    return Controller;
  }();

  var browser = new BrowserDetection({
    chrome: 67,
    edge: 16,
    ie: 1000,
    firefox: 63,
    safari: 10,
    opera: 1000,
    operamini: 1000
  });

  if (!browser.isSupported()) {
    document.querySelector('html').classList.add('browser-update');
    throw new Error('Browser not supported!');
  }

  var router = new Router({
    links: 'a.discover'
  });
  var controller = new Controller({
    router: router,
    browser: browser
  });
  router.add('/', function (request) {
    return controller.handle(request);
  }).add('/matthieu-x', function (request) {
    return controller.handle(request);
  }).add('/speculum', function (request) {
    return controller.handle(request);
  }).add('/tout-sur-le-rouge', function (request) {
    return controller.handle(request);
  }).add(function (request) {
    return controller.handleError404(request);
  }).init({
    path: window.location.pathname
  });
}());
