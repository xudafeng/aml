;(function ($) {
    var leafsfolder = "";
    var Body = $("body");
    var WindowHeigth = $(window).height();
    var WindowsWidth = $(window).width();
    var leafNum = 0;
    var Initiated = false;
    var howmanyimgsare = 0;
    var maxYposition = 10;
    $(window).resize(function () {
        WindowHeigth = $(window).height();
        WindowsWidth = $(window).width()
    });
    $.AutomLeafStart = function (settings) {
        settings = $.extend({
            initialleafs: 50,
            maxYposition: 100,
            infinite: true,
            fallingsequence: 3000,
            multiplyclick: true,
            multiplynumber: 1,
            leafsfolder: "static/AutomLeafs/",
            howmanyimgsare: 8
        }, settings);
        if (Initiated == true) {
            return 0
        }
        Initiated = true;
        leafsfolder = settings.leafsfolder;
        howmanyimgsare = settings.howmanyimgsare;
        maxYposition = settings.maxYposition;
        var Position = 0;
        for (var i = 0; i < settings.initialleafs; i++) {
            Position = 1 + Math.floor(Math.random() * 2);
            switch (Position) {
                case 1:
                    CreateLeafTop("left");
                    break;
                case 2:
                    CreateLeafTop("right");
                    break
            }
        }
        $("body").on("click", ".AutomLeaf", function () {
            var ID = $(this).attr("ID");
            DropLeaf(ID)
        });
        $("body").on("click", ".AutomLeaffalling", function () {
            var ID = $(this).attr("ID");
            LeafTouch(ID)
        });
        if (settings.multiplyclick == true) {
            $("body").on("click", ".AutomLeaffalling", function () {
                var ID = $(this).attr("ID");
                Multiply(ID)
            })
        }
        var FallingInterval = setInterval(function () {
            var random = randomFromInterval(0, $(".AutomLeaf").length);
            var ThisLeafFall = $(".AutomLeaf").eq(random);
            var ThisLeafID = ThisLeafFall.attr("id");
            DropLeaf(ThisLeafID, false);
            if ($(".AutomLeaf").length == 0) {
                clearInterval(FallingInterval)
            }
        }, settings.fallingsequence);

        function Multiply(ID) {
            var Touched = $("#" + ID);
            var x = Touched.position().top;
            var y = Touched.position().left;
            var NewLeaf = "";
            for (var i = 0; i <= settings.multiplynumber; i++) {
                leafNum += 1;
                var Number = 1 + Math.floor(Math.random() * settings.howmanyimgsare);
                var CurrentClass = Touched.attr("class").replace("AutomLeaffalling", "");
                NewLeaf = '<img id="lf' + leafNum + '" class="AutomLeaf AutomLeaf_x' + CurrentClass + '" src="' + leafsfolder + Number + '.png"/>';
                $("body").append(NewLeaf);
                var NewLeaf = $("#lf" + leafNum);
                NewLeaf.css({
                    top: x + "px",
                    left: y + "px",
                }).animate({
                        opacity: 1,
                    }, 300);
                DropLeaf("lf" + leafNum, true);
                LeafTouch("lf" + leafNum)
            }
        }
        function LeafTouch(ID) {
            var Falling = $("#" + ID);
            var CurrentAngle = Falling.getRotateAngle();
            var AnimateTo = 0;
            if (CurrentAngle > 0) {
                AnimateTo = 720
            } else {
                AnimateTo = -720
            }
            Falling.rotate({
                animateTo: AnimateTo,
                duration: 20000,
            })
        }
        function DropLeaf(ID, wasClicked) {
            var ThisLeafFall = $("#" + ID);
            ThisLeafFall.removeClass("AutomLeaf").addClass("AutomLeaffalling");
            ThisLeafFall.animate({
                top: "+=" + (WindowHeigth + 150),
            }, 5000, function () {
                ThisLeafFall.clearQueue().animate({
                    opacity: 0,
                }, 300, function () {
                    ThisLeafFall.remove();
                    if (settings.infinite == true) {
                        Position = 1 + Math.floor(Math.random() * 2);
                        switch (Position) {
                            case 1:
                                if (wasClicked == false) {
                                    CreateLeafTop("left")
                                }
                                break;
                            case 2:
                                if (wasClicked == false) {
                                    CreateLeafTop("right")
                                }
                                break
                        }
                    }
                })
            });
            var CurrentAngle = ThisLeafFall.getRotateAngle();
            var AnimateTo = 0;
            if (CurrentAngle > 0) {
                AnimateTo = 120
            } else {
                AnimateTo = -120
            }
            if (wasClicked == true) {
                var Ran = randomFromInterval(200, 600);
                if (CurrentAngle > 0) {
                    AnimateTo = 420 + Ran
                } else {
                    AnimateTo = -420 - Ran
                }
                var Ran1 = randomFromInterval(5, 300);
                var Ran2 = randomFromInterval(5, 300);
                var Ran3 = randomFromInterval(10000, 15000);
                ThisLeafFall.rotate({
                    animateTo: AnimateTo,
                    center: [Ran1 + "%", Ran2 + "%"],
                    duration: Ran3,
                })
            } else {
                ThisLeafFall.rotate({
                    animateTo: AnimateTo,
                    duration: 10000,
                })
            }
        }
        function CreateLeafTop(RightLeft) {
            var NewLeaf = "";
            leafNum += 1;
            var Number = 1 + Math.floor(Math.random() * settings.howmanyimgsare);
            var SizeRandom = 1 + Math.floor(Math.random() * 4);
            NewLeaf = '<img id="lf' + leafNum + '" class="AutomLeaf AutomLeaf_x' + SizeRandom + '" src="' + leafsfolder + Number + '.png"/>';
            $("body").append(NewLeaf);
            var ThisLeaf = $("#lf" + leafNum);
            var Middle = WindowsWidth / 2;
            if (RightLeft == "right") {
                var X = randomFromInterval(Middle, WindowsWidth);
                var Angle = randomFromInterval(0, 50)
            } else {
                var X = randomFromInterval(-50, Middle);
                var Angle = randomFromInterval(0, -50)
            }
            var RandomTime = randomFromInterval(500, 8000);
            ThisLeaf.rotate({
                animateTo: Angle,
                duration: RandomTime,
                center: ["10%", "110%"],
            });
            ThisLeaf.animate({
                opacity: 1,
            }, (RandomTime - 400));
            var Y = randomFromInterval(-100, settings.maxYposition);
            ThisLeaf.css({
                left: X + "px",
                top: Y + "px"
            })
        }
    };
    $.AutomLeafAdd = function (settings) {
        settings = $.extend({
            leafsfolder: "static/AutomLeafs/",
            add: 1,
        }, settings);
        for (var z = 0; z < settings.add; z++) {
            var NewLeaf = "";
            leafNum += 1;
            var Number = 1 + Math.floor(Math.random() * howmanyimgsare);
            var SizeRandom = 1 + Math.floor(Math.random() * 4);
            NewLeaf = '<img id="lf' + leafNum + '" class="AutomLeaf AutomLeaf_x' + SizeRandom + '" src="' + leafsfolder + Number + '.png"/>';
            $("body").append(NewLeaf);
            var ThisLeaf = $("#lf" + leafNum);
            var Middle = WindowsWidth / 2;
            var Pos = randomFromInterval(1, 2);
            if (Pos == 2) {
                var X = randomFromInterval(Middle, WindowsWidth);
                var Angle = randomFromInterval(0, 50)
            } else {
                var X = randomFromInterval(-50, Middle);
                var Angle = randomFromInterval(0, -50)
            }
            var RandomTime = randomFromInterval(500, 8000);
            ThisLeaf.rotate({
                animateTo: Angle,
                duration: RandomTime,
                center: ["10%", "110%"],
            });
            ThisLeaf.animate({
                opacity: 1,
            }, (RandomTime - 400));
            var Y = randomFromInterval(-100, maxYposition);
            ThisLeaf.css({
                left: X + "px",
                top: Y + "px"
            })
        }
    };

    function randomFromInterval(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from)
    }(function ($) {
        var supportedCSS, supportedCSSOrigin, styles = document.getElementsByTagName("head")[0].style,
            toCheck = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
        for (var a = 0; a < toCheck.length; a++) {
            if (styles[toCheck[a]] !== undefined) {
                supportedCSS = toCheck[a]
            }
        }
        if (supportedCSS) {
            supportedCSSOrigin = supportedCSS.replace(/[tT]ransform/, "TransformOrigin");
            if (supportedCSSOrigin[0] == "T") {
                supportedCSSOrigin[0] = "t"
            }
        }
        eval('IE = "v"=="\v"');
        jQuery.fn.extend({
            rotate: function (parameters) {
                if (this.length === 0 || typeof parameters == "undefined") {
                    return
                }
                if (typeof parameters == "number") {
                    parameters = {
                        angle: parameters
                    }
                }
                var returned = [];
                for (var i = 0, i0 = this.length; i < i0; i++) {
                    var element = this.get(i);
                    if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {
                        var paramClone = $.extend(true, {}, parameters);
                        var newRotObject = new Wilq32.PhotoEffect(element, paramClone)._rootObj;
                        returned.push($(newRotObject))
                    } else {
                        element.Wilq32.PhotoEffect._handleRotation(parameters)
                    }
                }
                return returned
            },
            getRotateAngle: function () {
                var ret = [];
                for (var i = 0, i0 = this.length; i < i0; i++) {
                    var element = this.get(i);
                    if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                        ret[i] = element.Wilq32.PhotoEffect._angle
                    }
                }
                return ret
            },
            stopRotate: function () {
                for (var i = 0, i0 = this.length; i < i0; i++) {
                    var element = this.get(i);
                    if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                        clearTimeout(element.Wilq32.PhotoEffect._timer)
                    }
                }
            }
        });
        Wilq32 = window.Wilq32 || {};
        Wilq32.PhotoEffect = (function () {
            if (supportedCSS) {
                return function (img, parameters) {
                    img.Wilq32 = {
                        PhotoEffect: this
                    };
                    this._img = this._rootObj = this._eventObj = img;
                    this._handleRotation(parameters)
                }
            } else {
                return function (img, parameters) {
                    this._img = img;
                    this._onLoadDelegate = [parameters];
                    this._rootObj = document.createElement("span");
                    this._rootObj.style.display = "inline-block";
                    this._rootObj.Wilq32 = {
                        PhotoEffect: this
                    };
                    img.parentNode.insertBefore(this._rootObj, img);
                    if (img.complete) {
                        this._Loader()
                    } else {
                        var self = this;
                        jQuery(this._img).bind("load", function () {
                            self._Loader()
                        })
                    }
                }
            }
        })();
        Wilq32.PhotoEffect.prototype = {
            _setupParameters: function (parameters) {
                this._parameters = this._parameters || {};
                if (typeof this._angle !== "number") {
                    this._angle = 0
                }
                if (typeof parameters.angle === "number") {
                    this._angle = parameters.angle
                }
                this._parameters.animateTo = (typeof parameters.animateTo === "number") ? (parameters.animateTo) : (this._angle);
                this._parameters.step = parameters.step || this._parameters.step || null;
                this._parameters.easing = parameters.easing || this._parameters.easing || this._defaultEasing;
                this._parameters.duration = parameters.duration || this._parameters.duration || 1000;
                this._parameters.callback = parameters.callback || this._parameters.callback || this._emptyFunction;
                this._parameters.center = parameters.center || this._parameters.center || ["50%", "50%"];
                if (typeof this._parameters.center[0] == "string") {
                    this._rotationCenterX = (parseInt(this._parameters.center[0], 10) / 100) * this._imgWidth * this._aspectW
                } else {
                    this._rotationCenterX = this._parameters.center[0]
                }
                if (typeof this._parameters.center[1] == "string") {
                    this._rotationCenterY = (parseInt(this._parameters.center[1], 10) / 100) * this._imgHeight * this._aspectH
                } else {
                    this._rotationCenterY = this._parameters.center[1]
                }
                if (parameters.bind && parameters.bind != this._parameters.bind) {
                    this._BindEvents(parameters.bind)
                }
            },
            _emptyFunction: function () {},
            _defaultEasing: function (x, t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b
            },
            _handleRotation: function (parameters, dontcheck) {
                if (!supportedCSS && !this._img.complete && !dontcheck) {
                    this._onLoadDelegate.push(parameters);
                    return
                }
                this._setupParameters(parameters);
                if (this._angle == this._parameters.animateTo) {
                    this._rotate(this._angle)
                } else {
                    this._animateStart()
                }
            },
            _BindEvents: function (events) {
                if (events && this._eventObj) {
                    if (this._parameters.bind) {
                        var oldEvents = this._parameters.bind;
                        for (var a in oldEvents) {
                            if (oldEvents.hasOwnProperty(a)) {
                                jQuery(this._eventObj).unbind(a, oldEvents[a])
                            }
                        }
                    }
                    this._parameters.bind = events;
                    for (var a in events) {
                        if (events.hasOwnProperty(a)) {
                            jQuery(this._eventObj).bind(a, events[a])
                        }
                    }
                }
            },
            _Loader: (function () {
                if (IE) {
                    return function () {
                        var width = this._img.width;
                        var height = this._img.height;
                        this._imgWidth = width;
                        this._imgHeight = height;
                        this._img.parentNode.removeChild(this._img);
                        this._vimage = this.createVMLNode("image");
                        this._vimage.src = this._img.src;
                        this._vimage.style.height = height + "px";
                        this._vimage.style.width = width + "px";
                        this._vimage.style.position = "absolute";
                        this._vimage.style.top = "0px";
                        this._vimage.style.left = "0px";
                        this._aspectW = this._aspectH = 1;
                        this._container = this.createVMLNode("group");
                        this._container.style.width = width;
                        this._container.style.height = height;
                        this._container.style.position = "absolute";
                        this._container.style.top = "0px";
                        this._container.style.left = "0px";
                        this._container.setAttribute("coordsize", width - 1 + "," + (height - 1));
                        this._container.appendChild(this._vimage);
                        this._rootObj.appendChild(this._container);
                        this._rootObj.style.position = "relative";
                        this._rootObj.style.width = width + "px";
                        this._rootObj.style.height = height + "px";
                        this._rootObj.setAttribute("id", this._img.getAttribute("id"));
                        this._rootObj.className = this._img.className;
                        this._eventObj = this._rootObj;
                        var parameters;
                        while (parameters = this._onLoadDelegate.shift()) {
                            this._handleRotation(parameters, true)
                        }
                    }
                } else {
                    return function () {
                        this._rootObj.setAttribute("id", this._img.getAttribute("id"));
                        this._rootObj.className = this._img.className;
                        this._imgWidth = this._img.naturalWidth;
                        this._imgHeight = this._img.naturalHeight;
                        var _widthMax = Math.sqrt((this._imgHeight) * (this._imgHeight) + (this._imgWidth) * (this._imgWidth));
                        this._width = _widthMax * 3;
                        this._height = _widthMax * 3;
                        this._aspectW = this._img.offsetWidth / this._img.naturalWidth;
                        this._aspectH = this._img.offsetHeight / this._img.naturalHeight;
                        this._img.parentNode.removeChild(this._img);
                        this._canvas = document.createElement("canvas");
                        this._canvas.setAttribute("width", this._width);
                        this._canvas.style.position = "relative";
                        this._canvas.style.left = -this._img.height * this._aspectW + "px";
                        this._canvas.style.top = -this._img.width * this._aspectH + "px";
                        this._canvas.Wilq32 = this._rootObj.Wilq32;
                        this._rootObj.appendChild(this._canvas);
                        this._rootObj.style.width = this._img.width * this._aspectW + "px";
                        this._rootObj.style.height = this._img.height * this._aspectH + "px";
                        this._eventObj = this._canvas;
                        this._cnv = this._canvas.getContext("2d");
                        var parameters;
                        while (parameters = this._onLoadDelegate.shift()) {
                            this._handleRotation(parameters, true)
                        }
                    }
                }
            })(),
            _animateStart: function () {
                if (this._timer) {
                    clearTimeout(this._timer)
                }
                this._animateStartTime = +new Date;
                this._animateStartAngle = this._angle;
                this._animate()
            },
            _animate: function () {
                var actualTime = +new Date;
                var checkEnd = actualTime - this._animateStartTime > this._parameters.duration;
                if (checkEnd && !this._parameters.animatedGif) {
                    clearTimeout(this._timer)
                } else {
                    if (this._canvas || this._vimage || this._img) {
                        var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
                        this._rotate((~~ (angle * 10)) / 10)
                    }
                    if (this._parameters.step) {
                        this._parameters.step(this._angle)
                    }
                    var self = this;
                    this._timer = setTimeout(function () {
                        self._animate.call(self)
                    }, 10)
                }
                if (this._parameters.callback && checkEnd) {
                    this._angle = this._parameters.animateTo;
                    this._rotate(this._angle);
                    this._parameters.callback.call(this._rootObj)
                }
            },
            _rotate: (function () {
                var rad = Math.PI / 180;
                if (IE) {
                    return function (angle) {
                        this._angle = angle;
                        this._container.style.rotation = (angle % 360) + "deg";
                        this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px";
                        this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px";
                        this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px";
                        this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px"
                    }
                } else {
                    if (supportedCSS) {
                        return function (angle) {
                            this._angle = angle;
                            this._img.style[supportedCSS] = "rotate(" + (angle % 360) + "deg)";
                            this._img.style[supportedCSSOrigin] = this._parameters.center.join(" ")
                        }
                    } else {
                        return function (angle) {
                            this._angle = angle;
                            angle = (angle % 360) * rad;
                            this._canvas.width = this._width;
                            this._canvas.height = this._height;
                            this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH);
                            this._cnv.translate(this._rotationCenterX, this._rotationCenterY);
                            this._cnv.rotate(angle);
                            this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY);
                            this._cnv.scale(this._aspectW, this._aspectH);
                            this._cnv.drawImage(this._img, 0, 0)
                        }
                    }
                }
            })()
        };
        if (IE) {
            Wilq32.PhotoEffect.prototype.createVMLNode = (function () {
                document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                try {
                    !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                    return function (tagName) {
                        return document.createElement("<rvml:" + tagName + ' class="rvml">')
                    }
                } catch (e) {
                    return function (tagName) {
                        return document.createElement("<" + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                    }
                }
            })()
        }
    })(jQuery)
})(jQuery);