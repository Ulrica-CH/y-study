class Form {
    constructor() {
      this.fields = [];
    }
  
    addField(field) {
      this.fields.push(field);
    }
  
    getForm() {
      return this.fields;
    }
  }
  
  class FormBuilder {
    constructor() {
      this.form = new Form();
    }
  
    addTextField(label) {
      this.form.addField({ type: "text", label });
      return this;
    }
  
    addCheckboxField(label) {
      this.form.addField({ type: "checkbox", label });
      return this;
    }
  
    build() {
      return this.form;
    }
  }
  
  
  const formBuilder = new FormBuilder();
  const form = formBuilder
    .addTextField("Name")
    .addCheckboxField("Subscribe")
    .build(); // 必须这样设计，设计如此
  
  console.log(form.getForm()); // [{type: 'text', label: 'Name'}, {type: 'checkbox', label: 'Subscribe'}]
  