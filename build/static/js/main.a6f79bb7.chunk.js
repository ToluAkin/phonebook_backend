(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{19:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t(14),r=t.n(a),o=(t(19),t(3)),u=t(4),i=t.n(u),d="/api/persons",l={getAll:function(){return i.a.get(d).then((function(e){return e.data}))},create:function(e){return i.a.post(d,e).then((function(e){return e.data}))},update:function(e,n){return i.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},remove:function(e){return i.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))}},s=t(0),h=function(e){var n=e.persons.map((function(n,t){return Object(s.jsxs)("li",{children:[n.name," ",n.number," ",Object(s.jsx)("button",{"data-id":n.id,onClick:e.handleDelete,children:"delete"})]},t)}));return Object(s.jsx)("ul",{children:n})},b=function(e){return Object(s.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:e.copyNewName,onChange:e.handleNameChange})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{value:e.copyNewNumber,onChange:e.handleNumberChange})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},j=function(e){return Object(s.jsxs)("div",{children:["filter shown with",Object(s.jsx)("input",{value:e.copyFindName,onChange:e.handleFindNameChange})]})},f=function(e){var n,t=e.message;return null===t?null:(t&&(n=Object(s.jsx)("p",{className:t.includes("Added")?"success":"error",children:t})),Object(s.jsx)("div",{children:n}))},m=function(){var e=Object(c.useState)([]),n=Object(o.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(""),u=Object(o.a)(r,2),i=u[0],d=u[1],m=Object(c.useState)(""),O=Object(o.a)(m,2),p=O[0],v=O[1],g=Object(c.useState)(""),x=Object(o.a)(g,2),N=x[0],w=x[1],y=Object(c.useState)(""),C=Object(o.a)(y,2),S=C[0],k=C[1],A=i,D=t,F=p,E=N;Object(c.useEffect)((function(){l.getAll().then((function(e){a(e)}))}),[]);return Object(s.jsxs)("div",{children:[Object(s.jsx)(j,{copyFindName:E,handleFindNameChange:function(e){var n=document.querySelectorAll("li");w(e.target.value),n.forEach((function(e){var n=e.innerHTML.toLowerCase().includes(E);e.style.display=n?"":"none"}))}}),Object(s.jsx)("h2",{children:"Phone book"}),Object(s.jsx)(f,{message:S}),Object(s.jsx)(b,{copyNewName:A,copyNewNumber:F,handleSubmit:function(e){e.preventDefault();var n=D.filter((function(e){return e.name==A})),t={name:A,number:F};if(n.length){var c=n[0].id;window.confirm("".concat(A," is already in the phone book, replace the old number with a new one"))&&l.update(c,t).then((function(e){a(D.map((function(n){return n.id!==c?n:e})))})).catch((function(e){console.log(e),k("Information of ".concat(A," has already been removed from the server")),setTimeout((function(){k(null)}),5e3),a(D.filter((function(e){return e.id!==c}))),d(""),v("")}))}else l.create(t).then((function(e){a(D.concat(e)),d(""),v("")}));k("Added ".concat(A)),setTimeout((function(){k(null)}),5e3)},handleNameChange:function(e){d(e.target.value)},handleNumberChange:function(e){v(e.target.value)}}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(h,{persons:D,handleDelete:function(e){var n=e.target.getAttribute("data-id"),t=D.find((function(e){return e.id==n})),c=D.filter((function(e){return e.id!=n}));window.confirm("Delete ".concat(t.name," ?"))&&l.remove(n).then((function(e){a(c)}))}})]})};r.a.render(Object(s.jsx)(m,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.a6f79bb7.chunk.js.map