// ==UserScript==
// @name     ppf_theme
// @grant    GM_addStyle
// @run-at   document-start
// @author   vamtic:
// @include  https://pixelplanet.fun/*
// ==/UserScript==

GM_addStyle ( `
a:link {
  color: #00ced1;
}

a:visited {
  color: #4682b4;
}

a:hover {
  color: #5f9ea0;
}

.modallink {
  color: #00ced1;
}

.modallink:hover {
  color: #5f9ea0;
}

.inarea {
  border-color: #7fffd4;
}

.tab-list-item {
  color: #00ced1; 
}
.tab-list-item.active {
  background-color: #4682b4;
  color: white;
}
.tab-list-item:not(.active):hover {
  background-color: #5f9ea0;
}

tr:nth-child(even) {
  background-color: #20b2aa;
}

.window, .popup {
  background-color: rgba(0, 128, 128, 0.98);
  color: #f4f4f4;
}
.window {
  border-radius: 5px;
}

.win-title {
  background-color: #40e0d0;
}

.win-topbar, .modal-topbtn {
  color: black;
}

.win-title:hover {
  background-color: #48d1cc;
}

.win-topbtn, .modal-topbtn {
  background-color: #5f9ea0;
}

.win-topbtn:hover, .modal-topbtn:hover {
  background-color: #4682b4;
}

.channeldd, .contextmenu {
  background-color: #008b8b;
  color: #efefef;
  border-radius: 8px;
}

.chntop {
  margin-top: 4px;
}

.chn, .chntype, .contextmenu > div {
  background-color: #20b2aa;
}

.chn.selected, .chn:hover, .chntype.selected, .chntype:hover,
.contextmenu > div:hover {
  background-color: #2e8b57;
}

.actionbuttons, .coorbox, .onlinebox, .cooldownbox, #historyselect {
  background-color: rgba(0, 139, 139, 0.8);
  color: #f4f4f4;
  border-radius: 21px;
}

#pencilbutton.ppencil {
  background-color: rgba(0, 206, 209, 0.8);
}
#pencilbutton.phistory {
  background-color: rgba(31, 84, 111, 0.8);
}
#pencilbutton.poverlay {
  background-color: rgba(117, 31, 31, 0.8);
}

.menu > div {
  z-index: 1;
  background-color: #4682b4;
}

.modal, .Alert {
  background: #008b8b none repeat scroll 0 0;;
  color: #f4f4f4;
}

.modal {
  border-radius: 21px;
}

.Alert {
  border-radius: 12px;
}

.modal-content, .win-content, .popup-content {
  color: #f4f4f4;
}

h3, h4 {
  color: #afeeee;
}

.modaldesc {
  color: hsla(180, 100%, 75%, 0.6);
}

.modaldivider {
  background-color: hsla(180, 100%, 75%, 0.3);
}

.modalinfo, .tmpitm-desc span {
  color: #ddd;
}

.modalcvtext, .tmpitm-desc {
  color: hsla(180, 100%, 75%, 0.6);
}

.overlay {
  background-color: rgba(72, 209, 204, 0.75);
}

.chatname {
  background-color: #5f9ea0;
}
.mention {
  background-color: #4682b4;
}
.chatmsg:hover {
  background-color: #2e8b57;
}
.msg {
  color: #f3f3f3;
}
.msg.info{
  color: #ff91a6;
}
.msg.event{
  color: #9dc8ff;
}
.msg.greentext{
  color: #94ff94;
}
.ebex {
  color: #fff4bd;
}

.chatlink {
  color: #f9edde;
}

.statvalue {
  color: #ecc9ff;
}

.actionbuttons:hover, .coorbox:hover, .menu > div:hover {
  background-color: #2e8b57;
}
` );
