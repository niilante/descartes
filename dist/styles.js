"use strict";

var m = { "margin-left": 0, "margin-right": 0, "margin-top": 0, "margin-bottom": 0, "padding": 0 };
var heading = { "margin-top": 0, "margin-bottom": 15, "padding": 0, 'font-weight': 300 };
var max = 900;
var wrapper = { "max-width": max, "margin": "0 auto" };
var verticalAlign = { "position": "relative", "top": "50%", "transform": "translateY(-50%)" };
var _button = { "background": "none",
	"border-width": "1px",
	"border-style": "solid",
	"border-color": "currentColor",
	"padding": "10px 15px",
	"text-decoration": "none",
	"font-size": 12,
	"letter-spacing": 1,
	"text-transform": "uppercase",
	"font-weight": "normal",
	"cursor": "pointer" };
var clearfix = { "&::after": {
		"content": "",
		"display": "table",
		"clear": "both"
	}
};
var rand_rgba = function rand_rgba() {
	return "rgba(" + [255, 255, 255].map(function (x) {
		return Math.round(Math.random() * x);
	}).join() + ", 1)";
};
var rand_angle = function rand_angle() {
	return Math.round(Math.random() * 180 - 90);
};

var prop = function prop(sel, a, b, x, y) {
	if (sel <= a) return x;
	if (sel >= b) return y;
	var ratio = (sel - a) / (b - a);
	return x + (y - x) * ratio;
};

var p = new Plato();
var start = Date.now();

var lastScroll = $(window).scrollTop();
var d = new Descartes({
	"html": {
		"margin": 0,
		"padding": 0,
		"font-family": "Source Sans Pro, Helvetica",
		"color": "#333",
		"font-size": 16,
		"font-weight": 300,
		"height": "100%",
		"body": {
			"margin": 0,
			"padding": 0,
			"_listeners": [[window, "click"], ["#bgChange", "touchstart"]],
			"height": "100%",
			"@background": function background() {
				return 'linear-gradient(' + rand_angle().toString() + 'deg,' + rand_rgba() + ',' + rand_rgba() + ')' + ' center center fixed no-repeat';
			},
			"$(window).click": { "background": "@background" },
			"$(#bgChange).touchstart": { "background": "@background" },
			"pre": {
				"font-size": 14,
				"code": {
					"font-family": "Anonymous Pro"
				}
			},
			"a": {
				"color": "currentColor"
			},
			"nav": {
				"@box-shadow": function boxShadow(_) {
					return "0 0 15px " + p.rgba(100, 100, 100, p.scale($(window).scrollTop(), $(window).height() / 2, $(window).height(), 0, 0.2));
				},
				"@height": function height(_) {
					if ($(window).width() < p.layout.wrappers.mobile) return "auto";
					var pos = $(window).scrollTop();
					if (pos > $(window).height() * 0.9 - 50 && pos > lastScroll) {
						lastScroll = pos;
						return 0;
					}
					lastScroll = pos;
					return 50;
				},
				"@background": function background(_) {
					if ($(window).width() < p.layout.wrappers.mobile) {
						return "rgba(255,255,255,0.9)";
					}
					return p.rgba(255, 255, 255, p.scale($(window).scrollTop(), $(window).height() / 2, $(window).height(), 0, 0.95));
				},
				"text-align": "center",
				"position": "fixed",
				"width": "100%",
				"overflow": "hidden",
				"box-sizing": "border-box",
				"transition": "all 0.5s ease",
				"z-index": 9999,
				"$(window).scroll": {
					"height": "@height",
					"box-shadow": "@box-shadow",
					"background": "@background"
				},
				"$(window).resize": {
					"height": "@height",
					"background": "@background"
				},
				".options": {
					"@display": function display(_) {
						if ($(window).width() < p.layout.wrappers.mobile && !$("nav").hasClass("show")) return "none";
						return "block";
					},
					"$(window).resize": { display: "@display" },
					"$(window).click": { display: "@display" },
					"$(window).touchstart": { display: "@display" }
				},
				"a": {
					"@color": function color(_) {
						if ($(window).width() < p.layout.wrappers.mobile) return "#333";
						var v = p.scale($(window).scrollTop(), $(window).height() / 2, $(window).height(), 255, 50);
						return p.rgba(v, v, v, 1);
					},
					"text-decoration": "none",
					"display": "block",
					"margin": "15px 0",
					"$(window).scroll": { "color": "@color" },
					"$(window).resize": { "color": "@color" }
				}
			},
			".button": {
				"background": "none",
				"border-width": "1px",
				"border-style": "solid",
				"border-color": "currentColor",
				"padding": "10px 15px",
				"text-decoration": "none",
				"font-size": 12,
				"letter-spacing": 1,
				"text-transform": "uppercase",
				"font-weight": "normal",
				"cursor": "pointer",
				"&.primary": {
					"background": "rgba(255,255,255, 0.25)"
				}
			},
			"button": {
				"background": "none",
				"border-width": "1px",
				"border-style": "solid",
				"border-color": "currentColor",
				"padding": "10px 15px",
				"text-decoration": "none",
				"font-size": 12,
				"letter-spacing": 1,
				"text-transform": "uppercase",
				"font-weight": "normal",
				"cursor": "pointer"
			},
			"img.roundImage": {
				"border-radius": function borderRadius(_) {
					return _.width / 2;
				},
				"overflow": "hidden",
				"margin-top": 10
			},
			".wrapper": {
				"_mixins": wrapper
			},
			"header": {
				"_mixins": m,
				"height": "90%",
				"color": "#fff",
				"div.content": {
					"_mixins": [verticalAlign, wrapper],
					"@opacity": function opacity() {
						return prop($(window).scrollTop(), 150, 350, 1, 0);
					},
					"$(window).scroll": { "opacity": "@opacity" },
					"text-align": "center",
					"h1": {
						"_mixins": heading,
						"font-weight": 100,
						"margin-bottom": 0,
						"$(window).resize": {
							"font-size": function fontSize() {
								return p.scale($(window).width(), p.layout.wrappers.mobile, p.layout.wrappers.default, 72, 120);
							},
							"line-height": function lineHeight() {
								return p.scale($(window).width(), p.layout.wrappers.mobile, p.layout.wrappers.default, 60, 110);
							}
						}
					},
					"h2": {
						"_mixins": heading,
						"margin-bottom": 0,
						"$(window).resize": {
							"font-size": function fontSize() {
								return p.scale($(window).width(), p.layout.wrappers.mobile, p.layout.wrappers.default, 24, 36);
							}
						}
					},
					".subtitle": {
						"_mixins": heading,
						"margin-bottom": 15,
						"$(window).resize": {
							"font-size": function fontSize() {
								return p.scale($(window).width(), p.layout.wrappers.mobile, p.layout.wrappers.default, 16, 20);
							}
						}
					},
					".shares": {
						"margin-top": 15,
						"font-size": 14
					},
					"pre": {
						"width": "100%",
						"code": {
							"text-align": "left",
							"font-size": 16,
							"font-family": "Anonymous Pro",
							"padding": 25,
							"background": "rgba(0,0,0,0.75)"
						}
					},
					"button": {
						"_mixins": _button,
						"color": "#fff"
					}
				}
			},
			"section": {
				"$(window).resize": {
					"padding": function padding() {
						return window.innerWidth >= p.layout.wrappers.mobile ? "50px 0" : "50px " + p.layout.grid.fixedGutter + "px";
					}
				},
				"box-sizing": "border-box",
				"&.plain": {
					"background": "none",
					"color": "#fff",
					"text-align": "center",
					".row": {
						"_mixins": [wrapper, p.clearfix()],
						"a.button": {
							"color": "#fff"
						}
					}
				},
				"&.features": {
					"color": "#fff",
					"background": "#474949",
					"margin-top": 25,
					"pre": {
						"border": "1px dashed #666"
					},
					".table-row": {
						"_mixins": [p.tableRow(), wrapper],
						".fa": {
							"padding-right": 10
						},
						".table-col12": {
							"font-size": 20
						},
						".table-col5": {
							"vertical-align": "middle",
							"padding-right": 25
						},
						".table-col7": {
							"vertical-align": "middle"
						}
					}
				},
				"&.offset": {
					"width": "100%",
					"background": "rgba(255,255,255,0.75)",
					"position": "relative",
					"min-height": "100%",
					".row": {
						"_mixins": [p.row(), wrapper],
						"box-sizing": "border-box",
						"font-size": 20
					},
					".info-row": {
						"_mixins": [p.tableRow()],
						"width": "100%",
						".info-col3": {
							"_mixins": p.tableCol(3),
							"vertical-align": "middle",
							"text-align": "right",
							".fa": {
								"padding-right": 25
							},
							"img": {
								"@display": function display() {
									return $(window).width() >= p.layout.wrappers.mobile ? "inline-block" : "none";
								},
								"$(window).resize": { "display": "@display" },
								"width": 25,
								"padding-right": 25
							}
						},
						".info-col9": {
							"_mixins": p.tableCol(9),
							"vertical-align": "middle",
							"text-align": "left",
							"padding-bottom": 15,
							"h3": {
								"font-weight": 100,
								"font-size": 25
							},
							"p": {
								"margin": 0,
								"span": {
									"font-size": 14
								}
							}
						}
					},
					".table-row": {
						"_mixins": [p.tableRow(), wrapper],
						"$(window).resize": {
							"min-height": function minHeight() {
								return window.innerHeight;
							}
						},
						".table-col5": {
							"_mixins": p.tableCol(5),
							"vertical-align": "middle",
							"padding": "0 25px"
						},
						".table-col7": {
							"_mixins": p.tableCol(7),
							"vertical-align": "middle"
						}
					}
				},
				".button": {
					"_mixins": _button,
					"color": "#333"
				},
				"h3": {
					"_mixins": heading,
					"font-size": 36,
					"margin-bottom": 0
				},
				"h4": {
					"_mixins": heading,
					"font-size": 24,
					"margin-bottom": 0
				}
			}
		}
	}
});
var time = Date.now() - start;
document.getElementById("time").innerHTML = time.toString();
if (time > 250) {
	document.getElementById("disclaimer").innerHTML = ' Okay, well, not so fast this time. Try reloading or take a look at how it might get faster <a href="https://github.com/JonHMChan/descartes/issues/26" target="_blank">in this open issue.</a>';
}
$("#mobileMenu").click(function () {
	$("nav").toggleClass("show");
	$("#mobileMenu a.button").html($("nav").hasClass("show") ? "Close Menu" : "Show Menu");
});

$(function () {
	$('a[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 500);
				return false;
			}
		}
	});
});