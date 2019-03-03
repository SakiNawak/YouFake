// "use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import QualityPickerButton from './quality-picker-button';

function qualityPickerPlugin() {
    var player = this;
    var tech = this.tech_;

    var SUPPORTED_TRACKS = ["video", "audio", "subtitle"];
    var TRACK_CLASS = {
        video: 'vjs-icon-cog',
        audio: 'vjs-icon-cog',
        subtitle: 'vjs-icon-subtitles'
    };

    tech.on('loadedqualitydata', onQualityData);

    function onQualityData(event, _ref) {
        var qualityData = _ref.qualityData,
            qualitySwitchCallback = _ref.qualitySwitchCallback;


        var fullscreenToggle = player.controlBar.getChild('fullscreenToggle');
        player.controlBar.removeChild(fullscreenToggle);

        for (var i = 0; i < SUPPORTED_TRACKS.length; i++) {
            var track = SUPPORTED_TRACKS[i];
            var name = track + "PickerButton";
            // videojs.utils.toTitleCase
            name = name.charAt(0).toUpperCase() + name.slice(1);

            var qualityPickerButton = player.controlBar.getChild(name);
            if (qualityPickerButton) {
                qualityPickerButton.dispose();
                player.controlBar.removeChild(qualityPickerButton);
            }

            if (qualityData[track] && qualityData[track].length > 1) {
                qualityPickerButton = new QualityPickerButton(player, { name: name, qualityList: qualityData[track], qualitySwitchCallback: qualitySwitchCallback, trackType: track });
                qualityPickerButton.addClass(TRACK_CLASS[track]);

                player.controlBar.addChild(qualityPickerButton);
            }
        }

        if (fullscreenToggle) {
            player.controlBar.addChild(fullscreenToggle);
        }
    }
}

videojs.plugin('qualityPickerPlugin', qualityPickerPlugin);

var VjsButton = videojs.getComponent('MenuButton');

var QualityPickerButton = function (_VjsButton) {
    _inherits(QualityPickerButton, _VjsButton);

    function QualityPickerButton() {
        _classCallCheck(this, QualityPickerButton);

        return _possibleConstructorReturn(this, (QualityPickerButton.__proto__ || Object.getPrototypeOf(QualityPickerButton)).apply(this, arguments));
    }

    _createClass(QualityPickerButton, [{
        key: "createMenu",
        value: function createMenu() {
            var menu = new QualityMenu(this.player, this.options_);
            var menuItem;
            var options;
            for (var i = 0; i < this.options_.qualityList.length; i++) {
                var quality = this.options_.qualityList[i];
                // console.log(quality.label);
                if(quality.label == '720p' || quality.label == '1080p'){
                    quality.label = quality.label+'<span style="color:#276FB6;font-size:12px;"><sup> <b id="hd-nigga">HD</b></sup></span>';
                }
                var _options_ = this.options_,
                    qualitySwitchCallback = _options_.qualitySwitchCallback,
                    trackType = _options_.trackType;

                options = Object.assign({ qualitySwitchCallback: qualitySwitchCallback, trackType: trackType }, quality, { selectable: true });

                menuItem = new QualityMenuItem(this.player, options);
                menu.addItem(menuItem);
            }

            return menu;
        }
    }]);

    return QualityPickerButton;
}(VjsButton);

// export default QualityPickerButton;

var VjsMenu = videojs.getComponent('Menu');

var QualityMenu = function (_VjsMenu) {
    _inherits(QualityMenu, _VjsMenu);

    function QualityMenu() {
        _classCallCheck(this, QualityMenu);

        return _possibleConstructorReturn(this, (QualityMenu.__proto__ || Object.getPrototypeOf(QualityMenu)).apply(this, arguments));
    }

    _createClass(QualityMenu, [{
        key: "addItem",
        value: function addItem(component) {
            var _this3 = this;

            _get(QualityMenu.prototype.__proto__ || Object.getPrototypeOf(QualityMenu.prototype), "addItem", this).call(this, component);

            component.on('click', function () {
                var children = _this3.children();

                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (component !== child) {
                        child.selected(false);
                    }
                }
            });
        }
    }]);

    return QualityMenu;
}(VjsMenu);

// export default QualityMenu;

var VjsMenuItem = videojs.getComponent('MenuItem');

var QualityMenuItem = function (_VjsMenuItem) {
    _inherits(QualityMenuItem, _VjsMenuItem);

    function QualityMenuItem() {
        _classCallCheck(this, QualityMenuItem);

        return _possibleConstructorReturn(this, (QualityMenuItem.__proto__ || Object.getPrototypeOf(QualityMenuItem)).apply(this, arguments));
    }

    _createClass(QualityMenuItem, [{
        key: "handleClick",
        value: function handleClick() {
            _get(QualityMenuItem.prototype.__proto__ || Object.getPrototypeOf(QualityMenuItem.prototype), "handleClick", this).call(this);

            this.options_.qualitySwitchCallback(this.options_.id, this.options_.trackType);
        }
    }]);

    return QualityMenuItem;
}(VjsMenuItem);

// export default QualityMenuItem;