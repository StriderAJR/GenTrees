(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){e.exports=n.p+"static/media/logo.ee7cd8ed.svg"},23:function(e,t,n){e.exports=n(60)},29:function(e,t,n){},31:function(e,t,n){},60:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(11),s=n.n(o),l=(n(29),n(3)),r=n(5),d=n(8),c=n(6),h=n(7),u=(n(30),n(20)),m=n.n(u),f=(n(31),n(1)),g=n(15),p=n.n(g),v=n(22),C=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(c.a)(t).call(this,e))).state={id:e.person.id,drawId:e.drawId,gender:e.person.gender,lastName:e.person.lastName,firstName:e.person.firstName,x:e.person.x,y:e.person.y,width:e.width,height:e.height,isSelected:e.person.isSelected,isBeingDragged:!1,isClicked:!1},n.renderNode=n.renderNode.bind(Object(f.a)(n)),n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"handleMenuItemClick",value:function(e){}},{key:"handleClick",value:function(e){e.stopPropagation(),console.log("Tree node onClick");var t=this.state.isSelected;t=!t,this.setState({isSelected:t},function(){this.props.selectionChanged(this.state.id,this.state.isSelected)})}},{key:"componentWillReceiveProps",value:function(e){this.setState({id:e.person.id,gender:e.person.gender,lastName:e.person.lastName,firstName:e.person.firstName,x:e.person.x,y:e.person.y,isSelected:e.person.isSelected})}},{key:"renderNode",value:function(){var e={height:this.props.height,width:this.props.width},t=this.state.drawId,n="nodeInner";return this.state.isSelected&&(n+=" selected"),t+=this.state.gender?" male":" female",i.a.createElement("div",{className:t,style:e},i.a.createElement("div",{className:n},i.a.createElement("b",null,this.state.lastName," ",this.state.firstName)))}},{key:"render",value:function(){var e=this,t={onMouseDown:function(){console.log("mouse down")},onClick:function(t){e.state.isClicked&&e.handleClick(t),e.setState({isClicked:!1})}};return i.a.createElement(v.a,{size:{width:this.state.width,height:this.state.height},position:{x:this.state.x,y:this.state.y},onDragStart:function(t,n){console.log("Tree node onDragStart"),e.setState({isBeingDragged:!0}),e.props.stateChanged(e.state)},onDrag:function(t,n){console.log("dragging..."),e.setState({x:n.x,y:n.y}),e.props.stateChanged(e.state)},onDragStop:function(t,n){console.log("Tree node onDragStop"),e.state.x!==n.x||e.state.y!==n.y?(e.setState({x:n.x,y:n.y}),e.props.positionChanged(e.state.id,n.x,n.y),e.props.stateChanged(e.state)):e.setState({isClicked:!0})},enableResizing:!1,enableUserSelectHack:!1,extendsProps:t,onMouseDown:function(){console.log("HELP")}},this.renderNode())}}]),t}(a.Component),y="FamilyTreeNode ",N=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(c.a)(t).call(this,e))).state={fromNodes:e.fromNodes,toNodes:e.toNodes},n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"componentWillReceiveProps",value:function(e){console.log(y+"componentWillReceiveProps()"),this.setState({fromNodes:e.fromNodes,toNodes:e.toNodes})}},{key:"render",value:function(){var e=this.state.fromNodes[0],t=this.state.toNodes[0],n=e.x+e.width,a=e.y+e.height/2,o=t.x,s=t.y+t.height/2,l=o-n,r=s-a;l>0||(n=t.x+t.width,l=(o=e.x)-n,s=e.y+e.height/2,a=t.y+t.height/2,r=Math.abs(s-a));var d=a!==s,c=r>0;if(console.log(y+"render(): from("+n+";"+a+") to("+o+";"+s+") width = "+l),d){var h=l/2,u={borderTop:"5px solid black",position:"absolute",top:a,left:n,width:h,height:"2px"},m={borderLeft:"5px solid black",position:"absolute",top:c?a:s,left:n+h,width:"2px",height:c?r:r+1},f={borderTop:"5px solid black",position:"absolute",top:a+r,left:n+h,width:h,height:"2px"},g="line-from"+e.id+"-to-"+t.id+"-part-1",p="line-from"+e.id+"-to-"+t.id+"-step",v="line-from"+e.id+"-to-"+t.id+"-part-2";return i.a.createElement("div",null,i.a.createElement("div",{id:g,style:u},"\xa0"),i.a.createElement("div",{id:p,style:m},"\xa0"),i.a.createElement("div",{id:v,style:f},"\xa0"))}var C={borderTop:"5px solid black",position:"absolute",top:a,left:n,width:l,height:"2px"},N="line-from"+e.id+"-to-"+t.id;return i.a.createElement("div",null,i.a.createElement("div",{id:N,style:C},"\xa0"))}}]),t}(a.Component),b=n(9),k=(n(40),n(12)),E=n.n(k),x="CREATE_PERSON",S="CREATE_SPOUSE",w="CREATE_PARENT",I="CREATE_CHILD",O="SPOUSE",j="PARENT",M="ADOPTED_CHILD",T="CHILD",P=function e(t,n,a,i,o,s,r,d,c){Object(l.a)(this,e),this.id=t,this.gender=!!A(n)||n,this.lastName=A(a)?"":a,this.firstName=A(i)?"":i,this.x=o,this.y=s,this.width=A(r)?200:r,this.height=A(d)?120:d,this.isSelected=c},F=function e(t,n,a){Object(l.a)(this,e),this.mainPersonId=t,this.relatedPersonId=n,this.relationType=a};function A(e){return"undefined"===typeof e&&null===e}var R=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(c.a)(t).call(this,e))).state={alert:null,mouseClickX:0,mouseClickY:0,nodes:[],relations:[],selectedNodeId:null,contextMenu:n.mainContextMenu()},n.onChildSelectionChanged=n.onChildSelectionChanged.bind(Object(f.a)(n)),n.onChildPositionChanged=n.onChildPositionChanged.bind(Object(f.a)(n)),n.onChildStateChanged=n.onChildStateChanged.bind(Object(f.a)(n)),n.hideAlert=n.hideAlert.bind(Object(f.a)(n)),n.addFamilyTreeNode=n.addFamilyTreeNode.bind(Object(f.a)(n)),n.renderEditForm=n.renderEditForm.bind(Object(f.a)(n)),n.mainContextMenu=n.mainContextMenu.bind(Object(f.a)(n)),n.getSelectedNode=n.getSelectedNode.bind(Object(f.a)(n)),n.getNodeById=n.getNodeById.bind(Object(f.a)(n)),n.getSelectedNodeRelations=n.getSelectedNodeRelations.bind(Object(f.a)(n)),n.refLastName=i.a.createRef(),n.refFirstName=i.a.createRef(),n.refGenderMale=i.a.createRef(),n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"renderEditForm",value:function(e){return null==e&&(e=new P),i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("label",{className:"edit-form-label",htmlFor:"lastName"}," Last name: "),i.a.createElement("input",{className:"edit-form-input",id:"lastName",ref:this.refLastName,type:"text"})),i.a.createElement("div",null,i.a.createElement("label",{className:"edit-form-label",htmlFor:"firstName"}," First name: "),i.a.createElement("input",{className:"edit-form-input",id:"firstName",ref:this.refFirstName,type:"text"})),i.a.createElement("div",null,i.a.createElement("label",{className:"edit-form-label"},"Gender: "),i.a.createElement("div",{className:"edit-form-input"},i.a.createElement("label",null,i.a.createElement("input",{type:"radio",ref:this.refGenderMale,name:"gender",value:"male",defaultChecked:!e.gender})," Male"),i.a.createElement("label",{style:{paddingLeft:"10px"}},i.a.createElement("input",{type:"radio",name:"gender",value:"female",defaultChecked:e.gender})," Female"))))}},{key:"handleMenuItemClick",value:function(e,t,n){var a={width:"auto",maxWidth:"70%"};e===x?this.setState({alert:i.a.createElement(E.a,{style:a,showCancel:!0,title:"Enter person's data",onCancel:this.hideAlert,onConfirm:this.addFamilyTreeNode.bind(this,t,n,null),onClick:function(e){return e.stopPropagation()}},this.renderEditForm(null))}):e===S?this.setState({alert:i.a.createElement(E.a,{style:a,showCancel:!0,title:"Enter person's data",onCancel:this.hideAlert,onConfirm:this.addFamilyTreeNode.bind(this,t,n,O)},this.renderEditForm(null))}):e===w?this.setState({alert:i.a.createElement(E.a,{style:a,showCancel:!0,title:"Enter person's data",onCancel:this.hideAlert,onConfirm:this.addFamilyTreeNode.bind(this,t,n,j)},this.renderEditForm(null))}):e===I&&this.setState({alert:i.a.createElement(E.a,{style:a,showCancel:!0,title:"Enter person's data",onCancel:this.hideAlert,onConfirm:this.addFamilyTreeNode.bind(this,t,n,T)},this.renderEditForm(null))})}},{key:"hideAlert",value:function(){this.setState({alert:null})}},{key:"getSelectedNode",value:function(){return this.getNodeById(this.state.selectedNodeId)}},{key:"getSelectedNodeRelations",value:function(){if(null==this.state.selectedNodeId)return null;for(var e=this.state.selectedNodeId,t=this.state.relations,n=[],a=0;a<t.length;a++)t[a].relatedPersonId===e&&n.push(t[a]);return n}},{key:"getNodeById",value:function(e){if(null==e)return null;for(var t=this.state.nodes,n=0;n<t.length;n++)if(t[n].id===e)return t[n];return null}},{key:"addFamilyTreeNode",value:function(e,t,n,a){console.log(n);var i=this.state.nodes.length,o=this.refLastName.current.value,s=this.refFirstName.current.value,l=this.refGenderMale.current.checked,r=this.state.selectedNodeId,d=(this.getSelectedNode(),this.state.nodes),c=this.state.relations,h=new P(i,l,o,s,e,t,200,120,!1);if(null!==r){this.getSelectedNodeRelations();n===T?c.push(new F(r,i,j)):c.push(new F(i,r,n)),d[r].isSelected=!1}d.push(h),this.setState({nodes:d,selectedNodeId:null,relations:c}),this.hideAlert()}},{key:"isInNode",value:function(e,t,n){for(var a=0;a<e.length;a++)if(t>=e[a].x&&t<=e[a].x+200&&n>=e[a].y&&n<=e[a].y+120)return a;return-1}},{key:"handleClick",value:function(e){var t=this.state.nodes,n=p()(".field").offset(),a=e.pageX-n.left,i=e.pageY-n.top;if(null==this.state.alert){console.log("clicked position = ["+a+", "+i+"]");for(var o=0;o<this.state.nodes.length;o++){var s=this.state.nodes[o];console.log("node coordinates = ["+s.x+", "+s.y+"] : ["+(s.x+200)+", "+(s.y+120)+"]")}var l=this.isInNode(this.state.nodes,a,i);-1!==l&&(t[l].isBeingDragged||(t[l].isSelected=!t[l].isSelected)),console.log("clickedNodeIndex = "+l);var r=this.state.contextMenu;if(-1===l)for(var d=0;d<t.length;d++)t[d].isSelected=!1;else if(2===e.button){t[l].isSelected=!0;for(var c=0;c<t.length;c++)c!==l&&(t[c].isSelected=!1);r=this.selectedNodeContextMenu()}this.setState({nodes:t,selectedNodeId:-1===l?null:l,contextMenu:r,mouseClickX:a,mouseClickY:i})}}},{key:"onChildSelectionChanged",value:function(e,t){if(null==this.state.alert){var n=this.state.nodes,a=this.state.contextMenu,i=this.state.selectedNodeId;t&&(a=this.selectedNodeContextMenu());for(var o=0;o<n.length;o++)n[o].id===e?(n[o].isSelected=t,i=o):n[o].isSelected=!1;this.setState({nodes:n,selectedNodeId:i,contextMenu:a})}}},{key:"onChildPositionChanged",value:function(e,t,n){var a=this.state.nodes;if(null!=a){for(var i=null,o=0;o<a.length;o++)if(a[o].id===e){i=a[o];break}null!=i&&(i.x=t,i.y=n,this.setState({nodes:a}))}}},{key:"onChildStateChanged",value:function(e){var t=this.state.nodes,n=t[e.id];n.gender=e.gender,n.lastName=e.lastName,n.firstName=e.firstName,n.x=e.x,n.y=e.y,n.width=200,n.height=120,n.isSelected=e.isSelected,n.isBeingDragged=e.isBeingDragged,console.log("tree onChildStateChanged(): new.x = "+e.x+" new.y = "+e.y),this.setState({nodes:t})}},{key:"mainContextMenu",value:function(){var e=this;return i.a.createElement(b.ContextMenu,{id:"family-context-menu"},i.a.createElement(b.Item,{onClick:function(){return e.handleMenuItemClick(x,e.state.mouseClickX,e.state.mouseClickY)}},"Create person"))}},{key:"selectedNodeContextMenu",value:function(){var e=this;return i.a.createElement(b.ContextMenu,{id:"family-context-menu"},i.a.createElement(b.Item,{onClick:function(){return e.handleMenuItemClick(w,e.state.mouseClickX,e.state.mouseClickY)}},"Create parent"),i.a.createElement(b.Item,{onClick:function(){return e.handleMenuItemClick(S,e.state.mouseClickX,e.state.mouseClickY)}},"Create spouse"),i.a.createElement(b.Item,{onClick:function(){return e.handleMenuItemClick(I,e.state.mouseClickX,e.state.mouseClickY)}},"Create child"))}},{key:"renderFamilyTree",value:function(){for(var e=[],t=[],n=this.state.relations,a=0;a<this.state.nodes.length;a++){var o=this.state.nodes[a],s="person"+o.id;e.push(i.a.createElement(C,{drawId:s,person:o,width:200,height:120,selectionChanged:this.onChildSelectionChanged,positionChanged:this.onChildPositionChanged,stateChanged:this.onChildStateChanged}))}for(var l=0;l<n.length;l++){var r=n[l],d=(r.mainPersonId,this.state.nodes[r.mainPersonId]),c=(r.relatedPersonId,this.state.nodes[r.relatedPersonId]);switch(r.relationType){case O:d.x<c.x?("right","left"):("left","right"),"h";break;case T:case M:"top center","bottom center";break;case j:"bottom center","top center"}var h=this.getNodeById(r.mainPersonId),u=this.getNodeById(r.relatedPersonId);console.log("tree render(): from.X = "+u.x+" from.y = "+u.y),console.log("tree render(): to.X = "+h.x+" to.y = "+h.y),t.push(i.a.createElement(N,{fromNodes:[u],toNodes:[h]}))}return i.a.createElement("div",{className:"field"},e,t)}},{key:"render",value:function(){return i.a.createElement("div",{className:"field",onMouseDown:this.handleClick.bind(this)},i.a.createElement(b.ContextMenuProvider,{className:"field",id:"family-context-menu"},this.renderFamilyTree()),this.state.contextMenu,this.state.alert)}}]),t}(a.Component),D=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(c.a)(t).call(this,e))).state={message:"???"},n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://stridingsoft.ru/GenTrees").then(function(e){return e.json()}).then(function(t){e.setState({message:t.Message})},function(t){e.setState({message:t.Message})})}},{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement("header",{className:"App-header"},i.a.createElement("img",{style:{float:"left"},src:m.a,className:"App-logo",alt:"logo"}),i.a.createElement("div",{style:{float:"left"}},i.a.createElement("div",{className:"App-title"},"Genealogy Trees"),i.a.createElement("div",{className:"App-hint"},"Right-click to see menu")),i.a.createElement("div",{style:{float:"right",textAlign:"right"},className:"App-hint"},i.a.createElement("div",null,"v0.0.10"),i.a.createElement("div",null,this.state.message))),i.a.createElement(R,null))}}]),t}(a.Component),B=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function L(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}s.a.render(i.a.createElement(D,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/GenTrees",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/GenTrees","/service-worker.js");B?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):L(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):L(e)})}}()}},[[23,1,2]]]);
//# sourceMappingURL=main.89c3fad2.chunk.js.map