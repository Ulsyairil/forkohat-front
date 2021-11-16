function Validation(form_id) {
  var form = document.getElementById(form_id)
  var config = {
    classTo: 'form-group',
    errorClass: 'text-danger',
    successClass: 'text-success',
    errorTextParent: 'form-group',
    errorTextTag: 'div',
    errorTextClass: 'help-text',
  }
  var pristine = new Pristine(form, config)
  return pristine
}

module.exports = Validation
