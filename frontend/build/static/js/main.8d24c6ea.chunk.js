(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{115:function(e,t,n){},117:function(e,t,n){},119:function(e,t,n){},122:function(e,t,n){},124:function(e,t,n){},126:function(e,t,n){},128:function(e,t,n){},131:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(28),r=n.n(o),s=(n(52),n(10)),p=n(11),c=n(13),l=n(12),u=n(14),m=n(7),d=n(133),h=n(135),E=n(4),N=n(132),O=n(20),g=n.n(O),b=n(22),A=Object(b.a)(),T=function(e){return function(t){var n={Authorization:"bearer ".concat(e)};console.log("Inside appointments!"),g.a.get("/api/appointments",{},{headers:n}).then(function(e){console.log(e.data)}).catch(function(e){console.log(e)})}},I={type:"AUTHENTICATE USER SUCCESS"},S=function(e){return function(t){var n={Authorization:"bearer ".concat(e)};g.a.post("/auth/authenticate",{},{headers:n}).then(function(e){return console.log(e.status),console.log(e.data),console.log("INSIDE AUTHENTICATE RESPONSE"),t(I())})}},f=function(e){return{type:"SET CURRENT APPOINTMENT NAME",appointmentName:e}},v=function(e){return{type:"SET CURRENT APPOINTMENT PHONE NUMBER",appointmentPhoneNumber:e}},M=function(e){return{type:"SET APPOINTMENT TIMES",appointments:e}},U=(n(115),Object(m.b)(function(e){return{guestMode:e.guestMode,currentUserAuthenticated:e.currentUserAuthenticated}})(function(e){return i.a.createElement(E.Navbar,{className:"nav",brand:"React Appointment Scheduler",left:!0},i.a.createElement(E.NavItem,{node:i.a.createElement("div",null)},i.a.createElement(N.a,{className:"navLink",to:"/"},"Home")),i.a.createElement(E.NavItem,{node:i.a.createElement("div",null),href:"components.html"},e.currentUserAuthenticated|e.guestMode?i.a.createElement(N.a,{className:"navLink",to:"/schedule"},"Schedule"):i.a.createElement(N.a,{onClick:function(){return e.dispatch({type:"ENABLE GUEST MODE"})},className:"navLink",to:"/schedule"},"Guest")),e.currentUserAuthenticated?i.a.createElement(E.NavItem,null,i.a.createElement(E.Button,{className:"waves-red waves-effect logOut",onClick:function(){return e.dispatch({type:"LOGOUT"})}},"Log Out")):null)})),j=n(2),P=(n(117),function(e){var t=e.appointmentName,n=e.appointmentTime,a=e.appointmentIndex,o=e.appointmentPhoneNumber,r=e.edited,s=e.onClick,p="".concat(r?"editedAppointment waves-effect waves-red":"newAppointment waves-effect waves-red"," appointmentBody ");return i.a.createElement("div",{className:"appointmentContainer",index:a,onClick:s},i.a.createElement("div",{index:a,className:"appointment"},i.a.createElement("div",{index:a,className:p+"name"},t||"+"),i.a.createElement("div",{index:a,className:p+"phoneNumber"},o||"Phone number"),i.a.createElement("div",{index:a,className:p+"time"},n)))}),y=(n(119),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).appointmentClick=n.appointmentClick.bind(Object(j.a)(Object(j.a)(n))),n}return Object(u.a)(t,e),Object(p.a)(t,[{key:"appointmentClick",value:function(e){var t=parseInt(e.target.getAttribute("index")),n=this.props.appointments[t].appointmentName,a=this.props.appointments[t].appointmentTime,i=this.props.appointments[t].appointmentPhoneNumber;this.props.dispatch(function(e){return{type:"SET CURRENT APPOINTMENT TIME",appointmentTime:e}}(a)),this.props.dispatch(f(n)),this.props.dispatch(v(i)),this.props.dispatch(function(e){return{type:"SET CURRENT APPOINTMENT INDEX",appointmentIndex:e}}(t)),this.props.dispatch(function(e){return{type:"SET CURRENT APPOINTMENT EDITED",appointmentIndex:e}}(t)),this.props.dispatch({type:"SHOW MODAL"})}},{key:"render",value:function(){var e=this,t=null;return this.props.appointments&&(t=this.props.appointments.map(function(t,n){return i.a.createElement(P,{key:n,appointmentTime:t.appointmentTime,appointmentName:t.appointmentName,appointmentIndex:t.appointmentIndex,appointmentPhoneNumber:t.appointmentPhoneNumber,edited:t.edited,onClick:e.appointmentClick})})),i.a.createElement("div",null,i.a.createElement("div",{className:"timeTable"},i.a.createElement("div",{className:"appointmentHead name"},"Appointment Name"),i.a.createElement("div",{className:"appointmentHead phoneNumber"},"Phone"),i.a.createElement("div",{className:"appointmentHead time"},"Time")),t)}}]),t}(a.Component)),C=Object(m.b)(function(e){return{appointments:e.appointments}})(y),k=n(42),w=n.n(k),D=function(e,t){for(var n=[],a=e,i=0;a<t+1;a++,i++)n.push({appointmentTime:w()({hour:a}).format("h:mm A"),appointmentName:"",appointmentIndex:i,appointmentPhoneNumber:"",edited:!1});return n},R=(n(122),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).closeModal=n.closeModal.bind(Object(j.a)(Object(j.a)(n))),n.closeModalAndUpdate=n.closeModalAndUpdate.bind(Object(j.a)(Object(j.a)(n))),n.updateApptName=n.updateApptName.bind(Object(j.a)(Object(j.a)(n))),n.updateAppointment=n.updateAppointment.bind(Object(j.a)(Object(j.a)(n))),n.clearAppointment=n.clearAppointment.bind(Object(j.a)(Object(j.a)(n))),n.updateApptPhoneNumber=n.updateApptPhoneNumber.bind(Object(j.a)(Object(j.a)(n))),n.validate=n.validate.bind(Object(j.a)(Object(j.a)(n))),n.showConfirmationModal=n.showConfirmationModal.bind(Object(j.a)(Object(j.a)(n))),n.closeConfirmationModal=n.closeConfirmationModal.bind(Object(j.a)(Object(j.a)(n))),n.deleteAppointments=n.deleteAppointments.bind(Object(j.a)(Object(j.a)(n))),n.keyDownSubmit=n.keyDownSubmit.bind(Object(j.a)(Object(j.a)(n))),n}return Object(u.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.props.dispatch({type:"CHECK TOKEN"}),this.props.currentUserID&&this.props.currentUserToken&&this.props.dispatch(S(this.props.currentUserToken)),this.props.guestMode?this.props.dispatch({type:"RETRIEVE APPOINTMENTS CACHE"}):this.props.dispatch(M(D(this.props.initialHour,this.props.endHour))),this.props.currentUserAuthenticated&&(console.log(),this.props.dispatch(T(this.props.currentUserToken)))}},{key:"componentWillReceiveProps",value:function(e){this.props.dispatch({type:"CHECK TOKEN"}),this.props.currentUserID&&this.props.currentUserToken&&this.props.dispatch(S(this.props.currentUserToken)),e.currentUserAuthenticated&&this.props.dispatch(T(this.props.currentUserToken))}},{key:"closeModal",value:function(){this.props.dispatch({type:"HIDE MODAL"}),this.clearAppointment()}},{key:"closeModalAndUpdate",value:function(){this.props.dispatch({type:"HIDE MODAL"}),this.props.dispatch({type:"UPDATE APPOINTMENT"}),this.props.dispatch({type:"SET APPOINTMENT EDITED"}),this.props.dispatch({type:"WRITE APPOINTMENTS CACHE"}),this.clearAppointment()}},{key:"validate",value:function(){this.props.dispatch({type:"VALIDATE APPOINTMENT NAME"}),this.props.dispatch({type:"VALIDATE PHONE NUMBER"})}},{key:"clearAppointment",value:function(){this.props.dispatch({type:"CLEAR CURRENT APPOINTMENT"})}},{key:"updateApptName",value:function(e){var t=e.target.value;this.props.dispatch(f(t)),this.props.dispatch({type:"VALIDATE APPOINTMENT NAME"})}},{key:"updateApptPhoneNumber",value:function(e){var t=e.target.value;this.props.dispatch(v(t)),this.props.dispatch({type:"VALIDATE PHONE NUMBER"})}},{key:"updateAppointment",value:function(){this.props.dispatch({type:"UPDATE APPOINTMENT"})}},{key:"deleteAppointments",value:function(){this.props.dispatch({type:"RESET APPOINTMENTS"}),this.props.dispatch(M(D(this.props.initialHour,this.props.endHour))),this.closeConfirmationModal()}},{key:"closeConfirmationModal",value:function(){this.props.dispatch({type:"HIDE DELETE CONFIRMATION MODAL"})}},{key:"showConfirmationModal",value:function(){this.props.dispatch({type:"SHOW DELETE CONFIRMATION MODAL"})}},{key:"keyDownSubmit",value:function(e){"Enter"===e.key&&this.props.appointmentNameValid&&this.props.phoneNumberValid&&this.closeModalAndUpdate()}},{key:"render",value:function(){var e=this.props.currentAppointment.edited?"Update Appointment Details":"Create Appointment",t=this.props.currentAppointment.edited?"Update":"Create";return i.a.createElement("div",{className:"slowPopIn"},i.a.createElement("div",{className:"scheduleContainer"},this.props.guestMode?i.a.createElement("div",{className:"guestModeContainer"},i.a.createElement(E.Button,{id:"appointmentReset",waves:"red",onClick:this.showConfirmationModal},"Reset Appointments"),i.a.createElement(E.Modal,{header:"Delete Appointments",modalOptions:{complete:this.closeConfirmationModal},actions:[i.a.createElement(E.Button,{key:"close",onClick:this.closeConfirmationModal,waves:"red",id:"closeConfirmationModal"},"Close"),i.a.createElement(E.Button,{key:"confirm",onClick:this.deleteAppointments,waves:"green",id:"confirmConfirmationModal"},"Confirm")],open:this.props.showDeleteModal},i.a.createElement("p",null,"Are you sure you want to delete all appointments?")),i.a.createElement("h5",{className:"guestMode"},"Guest mode"),i.a.createElement(C,null)):i.a.createElement("div",{className:"authenticated"},i.a.createElement("p",null,"Welcome ",this.props.currentUserEmail?this.props.currentUserEmail:""),i.a.createElement(C,null))),i.a.createElement(E.Modal,{header:e,open:this.props.showModal,fixedFooter:!0,actions:[i.a.createElement(E.Button,{id:"closeModal",key:"close",onClick:this.closeModal},"Close"),i.a.createElement(E.Button,{id:"updateModal",key:"updateModal",onClick:this.closeModalAndUpdate,disabled:!this.props.appointmentNameValid||!this.props.phoneNumberValid},t)],modalOptions:{complete:this.closeModal,ready:this.validate}},i.a.createElement(E.Row,null,i.a.createElement(E.Col,{l:6},i.a.createElement(E.Input,{id:"appointmentName",placeholder:-1===["+",""].indexOf(this.props.currentAppointment.appointmentName)?"":"Enter an appointment",defaultValue:this.props.currentAppointment.appointmentName,value:"+"===this.props.currentAppointment.appointmentName?"":this.props.currentAppointment.appointmentName,onChange:this.updateApptName,error:this.props.appointmentNameValid?"":"Enter an appointment name",success:this.props.appointmentNameValid?"\u2713":"",label:"Appointment Name",onKeyPress:this.keyDownSubmit})),i.a.createElement(E.Col,{l:6},i.a.createElement(E.Input,{id:"appointmentPhoneNumber",placeholder:""===this.props.currentAppointment.appointmentPhoneNumber?"123-123-5123":"",value:""===this.props.currentAppointment.appointmentPhoneNumber?"":this.props.currentAppointment.appointmentPhoneNumber,onChange:this.updateApptPhoneNumber,label:"Appointment Phone Number",error:this.props.phoneNumberValid?"":"123-456-7890",success:this.props.phoneNumberValid?"\u2713":"",onKeyPress:this.keyDownSubmit}))),i.a.createElement(E.Row,null,i.a.createElement("div",null,"Appointment Time: ",this.props.currentAppointment.appointmentTime)),this.props.appointmentValid?null:i.a.createElement("div",{className:"error"})))}}]),t}(a.Component)),V=Object(m.b)(function(e){return{guestMode:e.guestMode,showModal:e.showModal,currentAppointment:e.currentAppointment,appointments:e.appointments,appointmentNameValid:e.appointmentNameValid,phoneNumberValid:e.phoneNumberValid,showDeleteModal:e.showDeleteModal,initialHour:e.initialHour,endHour:e.endHour,currentUserAuthenticated:e.currentUserAuthenticated,currentUserToken:e.currentUserToken,currentUserID:e.currentUserID,currentUserEmail:e.currentUserEmail}})(R),L=(n(124),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).toggleRegistration=n.toggleRegistration.bind(Object(j.a)(Object(j.a)(n))),n.setEmail=n.setEmail.bind(Object(j.a)(Object(j.a)(n))),n.setPassword=n.setPassword.bind(Object(j.a)(Object(j.a)(n))),n.validateEmail=n.validateEmail.bind(Object(j.a)(Object(j.a)(n))),n.validatePassword=n.validatePassword.bind(Object(j.a)(Object(j.a)(n))),n.handleSignUpSignIn=n.handleSignUpSignIn.bind(Object(j.a)(Object(j.a)(n))),n.keyDownSubmit=n.keyDownSubmit.bind(Object(j.a)(Object(j.a)(n))),n}return Object(u.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.determineRegistration()}},{key:"setPassword",value:function(e){var t=e.target.value;this.props.dispatch(function(e){return{type:"SET PASSWORD",password:e}}(t)),this.validatePassword(),this.validateSignInSignUpForm()}},{key:"setEmail",value:function(e){var t=e.target.value;this.props.dispatch(function(e){return{type:"SET EMAIL",email:e}}(t)),this.validateEmail(),this.validateSignInSignUpForm()}},{key:"validatePassword",value:function(){this.props.dispatch({type:"VALIDATE PASSWORD"})}},{key:"validateEmail",value:function(){this.props.dispatch({type:"VALIDATE EMAIL"})}},{key:"validateSignInSignUpForm",value:function(){this.props.dispatch({type:"VALIDATE SIGNIN SIGNUP"})}},{key:"handleSignUpSignIn",value:function(){var e,t;console.log("this.props inside handle signup sign in",this.props),this.props.signInSignUpFormValid&&(this.props.registration?this.props.dispatch((e=this.props.email,t=this.props.password,function(n){g.a.post("/auth/register",{email:e,password:t}).then(function(e){if(console.log(e),"User Created"===e.data.message){var t=e.data.createdUser,a=t.email,i=t._id,o=e.data.token;return A.push("/schedule"),n(function(e,t,n){return{type:"REGISTER USER SUCCESS",token:e,email:t,_id:n}}(o,a,i))}}).catch(function(e){console.log("There was an error registering")})})):this.props.dispatch(function(e,t){return function(n){g.a.post("/auth/login",{email:e,password:t}).then(function(e){if(console.log(e),"Successfully logged in"===e.data.message){var t=e.data.loggedInUser,a=t.email,i=t._id,o=e.data.userToken;return console.log(a,i,o,"email, _id, usertoken inside login"),A.push("/schedule"),n({type:"LOGIN USER SUCCESS",email:a,id:i,token:o})}}).catch(function(e){console.log(e)})}}(this.props.email,this.props.password)))}},{key:"determineRegistration",value:function(){"/login"===this.props.match.url?this.props.dispatch({type:"UNSET_REGISTRATION"}):"/register"===this.props.match.url&&this.props.dispatch({type:"SET_REGISTRATION"})}},{key:"toggleRegistration",value:function(){this.props.dispatch({type:"TOGGLE REGISTRATION"})}},{key:"keyDownSubmit",value:function(e){"Enter"===e.key&&this.handleSignUpSignIn()}},{key:"render",value:function(){return i.a.createElement("div",{className:"slowPopIn",id:"signUpSignIn"},i.a.createElement("div",{className:"modal-overlay"},i.a.createElement(E.Preloader,{active:this.props.loaderState})),i.a.createElement("div",{className:"choice"},"I would like to: "),i.a.createElement(E.Row,null,i.a.createElement(E.Col,{l:12},i.a.createElement(E.Input,{type:"switch",checked:this.props.registration,onClick:this.toggleRegistration,onLabel:"Register",offLabel:"Login"}))),i.a.createElement(E.Row,null,i.a.createElement(E.Col,{m:6,offset:"m5"},i.a.createElement(E.Input,{label:"Email",id:"email",onChange:this.setEmail,success:this.props.emailValid?"\u2713":"",error:this.props.emailValid?"":"Email is invalid",onKeyPress:this.keyDownSubmit})),i.a.createElement(E.Col,{m:6,offset:"m5"},i.a.createElement(E.Input,{label:"Password",type:"password",id:"password",onChange:this.setPassword,success:this.props.passwordValid?"\u2713":"",error:this.props.passwordValid?"":"Between 6 and 20 characters. Must contain a lowercase, uppercase, number, and special character.",onKeyPress:this.keyDownSubmit}))),i.a.createElement(E.Row,null),i.a.createElement(E.Row,null,i.a.createElement(E.Button,{waves:"green",id:"authSubmit",disabled:!this.props.signInSignUpFormValid,onClick:this.handleSignUpSignIn},this.props.registration?"Register":"Sign In")))}}]),t}(a.Component)),H=Object(m.b)(function(e){return{registration:e.registration,emailValid:e.emailValid,passwordValid:e.passwordValid,signInSignUpFormValid:e.signInSignUpFormValid,password:e.password,email:e.email,loaderState:e.loaderState}})(L),G=(n(126),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).guestMode=n.guestMode.bind(Object(j.a)(Object(j.a)(n))),n}return Object(u.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.props.dispatch({type:"CHECK TOKEN"}),this.props.ipData||this.props.dispatch(function(e){g.a.get("/service/ip").then(function(t){if(200===t.status&&"fail"!==t.data.ipData.status)return e({type:"GET_IP_INFO_SUCCESS",ipData:t.data.ipData})}).catch(function(e){return console.log(e)})})}},{key:"guestMode",value:function(){this.props.dispatch({type:"ENABLE GUEST MODE"})}},{key:"render",value:function(){console.log(this.props.ipData,"ipdata in home.js!");var e=null;return this.props.ipData&&(e=" ".concat(this.props.currentUserAuthenticated?this.props.currentUserEmail:"guest"," from ").concat(this.props.ipData.city,", ").concat(this.props.ipData.region,"!")),i.a.createElement("div",{className:"headerContainer slowPopIn"},i.a.createElement("header",{className:"App-header"},i.a.createElement("p",{className:"welcomeText"},"Welcome",e||"!"," ",this.props.currentUserAuthenticated?"Please continue to your schedule!":"Please login or try out the app in Guest Mode!")),this.props.currentUserAuthenticated?i.a.createElement("div",{className:"welcome"},i.a.createElement(E.Button,{waves:"green"},i.a.createElement(N.a,{to:"/schedule"},"Schedule"))):i.a.createElement("div",{className:"welcome"},i.a.createElement(E.Button,{waves:"green"},i.a.createElement(N.a,{to:"/login"},"Login")),i.a.createElement(E.Button,{waves:"green"},i.a.createElement(N.a,{to:"/register"},"Register")),i.a.createElement(E.Button,{waves:"green"},i.a.createElement(N.a,{onClick:this.guestMode,to:"/schedule"},"Guest"))))}}]),t}(a.Component)),x=Object(m.b)(function(e){return{guestMode:e.guestMode,ipData:e.ipData,currentUserAuthenticated:e.currentUserAuthenticated,currentUserEmail:e.currentUserEmail}})(G),B=(n(128),function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=D(this.props.initialHour,this.props.endHour);this.props.dispatch(M(e)),this.props.dispatch({type:"CHECK TOKEN"}),this.props.currentUserID&&this.props.currentUserToken&&this.props.dispatch(S(this.props.currentUserToken))}},{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement("div",{className:"headerContainer"},i.a.createElement(U,null),i.a.createElement(d.a,{exact:!0,path:"/",component:x}),i.a.createElement(d.a,{path:"/schedule",component:V}),i.a.createElement(d.a,{path:"/:path(login|register)",component:H})))}}]),t}(a.Component)),F=Object(h.a)(Object(m.b)(function(e){return{initialHour:e.initialHour,endHour:e.endHour,currentUserID:e.currentUserID,currentUserToken:e.currentUserToken}})(B)),K=n(19),W=n(45),_=n(18),J={currentUserAuthenticated:!1,currentUserID:"",currentUserToken:"",currentUserEmail:"",appointments:[],guestMode:!1,ipAvailable:!1,ipData:null,initialHour:9,endHour:17,currentAppointment:{},appointmentNameValid:!1,phoneNumberValid:!1,appointmentNameFormTouched:!1,appointmentPhoneNumberFormTouched:!1,showDeleteModal:!1,registration:!1,password:"",email:"",emailValid:!1,passwordValid:!1,signInSignUpFormValid:!1},z=n(46),$=Object(K.createStore)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ENABLE GUEST MODE":return Object.assign({},e,{guestMode:!0});case"GET_IP_INFO_SUCCESS":return Object.assign({},e,{ipData:t.ipData});case"SHOW MODAL":return Object.assign({},e,{showModal:!0});case"HIDE MODAL":return Object.assign({},e,{showModal:!1});case"SET APPOINTMENT TIMES":return Object.assign({},e,{appointments:t.appointments});case"SET CURRENT APPOINTMENT NAME":return Object.assign({},e,{currentAppointment:Object(_.a)({},e.currentAppointment,{appointmentName:t.appointmentName})});case"SET CURRENT APPOINTMENT TIME":return Object.assign({},e,{currentAppointment:Object(_.a)({},e.currentAppointment,{appointmentTime:t.appointmentTime})});case"SET CURRENT APPOINTMENT PHONE NUMBER":return Object.assign({},e,{currentAppointment:Object(_.a)({},e.currentAppointment,{appointmentPhoneNumber:t.appointmentPhoneNumber})});case"SET CURRENT APPOINTMENT INDEX":return Object.assign({},e,{currentAppointment:Object(_.a)({},e.currentAppointment,{appointmentIndex:t.appointmentIndex})});case"UPDATE APPOINTMENT":if(!e.currentAppointment.appointmentName)return e;var n=e.appointments.slice();return n[e.currentAppointment.appointmentIndex]=e.currentAppointment,e.currentAppointment.edited||(e.currentAppointment.edited=!0),Object.assign({},e,{appointments:n,currentAppointment:Object(_.a)({},e.currentAppointment)});case"CLEAR CURRENT APPOINTMENT":return Object.assign({},e,{currentAppointment:{}});case"SET APPOINTMENT EDITED":var a=e.appointments.slice();return a[e.currentAppointment.appointmentIndex].edited=!0,Object.assign({},e,{appointments:a});case"SET CURRENT APPOINTMENT EDITED":return Object.assign({},e,{currentAppointment:Object(_.a)({},e.currentAppointment,{edited:e.appointments[t.appointmentIndex].edited})});case"VALIDATE PHONE NUMBER":var i=e.currentAppointment.appointmentPhoneNumber,o=new RegExp(/^\d{3}-\d{3}-\d{4}$/);return Object.assign({},e,{phoneNumberValid:o.test(i)});case"VALIDATE APPOINTMENT NAME":return Object.assign({},e,{appointmentNameValid:Boolean(e.currentAppointment.appointmentName)});case"RETRIEVE APPOINTMENTS CACHE":if(e.guestMode){var r=JSON.parse(localStorage.getItem("guest"));if(r)return Object.assign({},e,{appointments:r})}return e;case"WRITE APPOINTMENTS CACHE":return e.guestMode&&localStorage.setItem("guest",JSON.stringify(e.appointments)),e;case"RESET APPOINTMENTS":return e.guestMode?(localStorage.setItem("guest",null),Object.assign({},e,{apppointments:[]})):e;case"SHOW DELETE CONFIRMATION MODAL":return e.guestMode?Object.assign({},e,{showDeleteModal:!0}):e;case"HIDE DELETE CONFIRMATION MODAL":return e.guestMode?Object.assign({},e,{showDeleteModal:!1}):e;case"SET_REGISTRATION":return Object.assign({},e,{registration:!0});case"UNSET_REGISTRATION":return Object.assign({},e,{registration:!1});case"TOGGLE REGISTRATION":return Object.assign({},e,{registration:!e.registration});case"SET PASSWORD":return Object.assign({},e,{password:t.password});case"SET EMAIL":return Object.assign({},e,{email:t.email});case"VALIDATE EMAIL":return new RegExp(/^.+@{1}.+\.[a-zA-Z]{2,4}$/).test(e.email)?Object.assign({},e,{emailValid:!0}):Object.assign({},e,{emailValid:!1});case"VALIDATE PASSWORD":return new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$?%!\/\{\}\[\]\(\)]).{6,20})/).test(e.password)?Object.assign({},e,{passwordValid:!0}):Object.assign({},e,{passwordValid:!1});case"VALIDATE SIGNIN SIGNUP":return e.emailValid&&e.passwordValid?Object.assign({},e,{signInSignUpFormValid:!0}):Object.assign({},e,{signInSignUpFormValid:!1});case"CHECK TOKEN":var s=JSON.parse(localStorage.getItem("auth"));if(console.log(s,"auth info inside check token action"),s){var p=s.token,c=s.email,l=s.userID;if(p&&l&&c)return Object.assign({},e,{currentUserID:l,currentUserToken:p,currentUserEmail:c})}return e;case"REGISTER USER SUCCESS":return localStorage.setItem("auth",JSON.stringify({token:t.token,userEmail:t.email,userID:t.id})),Object.assign({},e,{currentUserAuthenticated:!0});case"AUTHENTICATE USER SUCCESS":return Object.assign({},e,{currentUserAuthenticated:!0});case"LOGIN USER SUCCESS":return console.log("action in login user",t),localStorage.setItem("auth",JSON.stringify({token:t.token,userEmail:t.email,userID:t.id})),console.log(localStorage,"local storage in login user"),Object.assign({},e,{currentUserAuthenticated:!0});case"LOGOUT":return localStorage.setItem("auth",null),A.push("/"),Object.assign({},{currentUserAuthenticated:!1});default:return e}},J,Object(z.composeWithDevTools)(Object(K.applyMiddleware)(W.a))),X=n(134);r.a.render(i.a.createElement(m.a,{store:$},i.a.createElement(X.a,{history:A},i.a.createElement(F,null))),document.getElementById("root"))},47:function(e,t,n){e.exports=n(131)},52:function(e,t,n){}},[[47,2,1]]]);
//# sourceMappingURL=main.8d24c6ea.chunk.js.map