Meteor.startup(function () {
    Session.set("editing", false);
});

Template.registerHelper("editingMode", function () {
    return Session.get("editing") || false;
});

Template.registerHelper("formatDate", function (datetime, format, showDefaultText) {
    var d = new Date(datetime)
        , _dateString
        , format = format || "long";

    showDefaultText = _.isBoolean(showDefaultText) ? showDefaultText : false;
    
    if (!datetime) {
        return showDefaultText && "Not specified" || "";
    }
    
    if (Package["momentjs:moment"]) {
        if (format === "relative") {
            _dateString = moment(d).fromNow();
        } else {
            var f = DateFormats[format] || format;
            _dateString = moment(d).format(f);
        }
    } else {
        // return basic mm/dd/yyyy format if momentjs not found
        _dateString = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
    }
    return _dateString;
});

Template.body.events({
    'click .toggle-edit': function (e, tmpl) {
        e.preventDefault();
        var _editing = Session.get("editing");
        Session.set("editing", !_editing);
    }
});