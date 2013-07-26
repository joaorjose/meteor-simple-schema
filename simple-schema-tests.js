var ssr = new SimpleSchema({
    requiredString: {
        type: String
    },
    requiredBoolean: {
        type: Boolean
    },
    requiredNumber: {
        type: Number
    },
    requiredDate: {
        type: Date
    },
    requiredEmail: {
        type: String,
        regEx: SchemaRegEx.Email,
        regExMessage: "is not a valid e-mail address"
    },
    requiredUrl: {
        type: String,
        regEx: SchemaRegEx.Url,
        regExMessage: "is not a valid URL"
    },
    requiredObject: {
        type: Object
    },
    'subdoc.requiredString': {
        type: String
    }
});

var ss = new SimpleSchema({
    string: {
        type: String,
        optional: true
    },
    minMaxString: {
        type: String,
        optional: true,
        min: 10,
        max: 20
    },
    allowedStrings: {
        type: String,
        optional: true,
        allowedValues: ["tuna", "fish", "salad"]
    },
    valueIsAllowedString: {
        type: Number,
        optional: true,
        valueIsAllowed: function(val) {
            return val === "pumpkin";
        }
    },
    boolean: {
        type: Boolean,
        optional: true
    },
    number: {
        type: Number,
        optional: true
    },
    minMaxNumber: {
        type: Number,
        optional: true,
        min: 10,
        max: 20
    },
    allowedNumbers: {
        type: Number,
        optional: true,
        allowedValues: [1, 2, 3]
    },
    valueIsAllowedNumber: {
        type: Number,
        optional: true,
        valueIsAllowed: function(val) {
            return val === 1;
        }
    },
    decimal: {
        type: Number,
        optional: true,
        decimal: true
    },
    date: {
        type: Date,
        optional: true
    },
    minDate: {
        type: Date,
        optional: true,
        min: (new Date(Date.UTC(2013, 0, 1)))
    },
    maxDate: {
        type: Date,
        optional: true,
        max: (new Date(Date.UTC(2012, 11, 31)))
    },
    email: {
        type: String,
        regEx: SchemaRegEx.Email,
        regExMessage: "is not a valid e-mail address",
        optional: true
    },
    url: {
        type: String,
        regEx: SchemaRegEx.Url,
        regExMessage: "is not a valid URL",
        optional: true
    }
});

Tinytest.add("SimpleSchema - Insert Required", function(test) {
    ssr.validate({});
    test.isTrue(ssr.invalidKeys().length === 8);

    ssr.validate({
        requiredString: null,
        requiredBoolean: null,
        requiredNumber: null,
        requiredDate: null,
        requiredEmail: null,
        requiredUrl: null,
        requiredObject: null,
        subdoc: {
            requiredString: null
        }
    });
    test.isTrue(ssr.invalidKeys().length === 8);

    ssr.validate({
        requiredString: void 0,
        requiredBoolean: void 0,
        requiredNumber: void 0,
        requiredDate: void 0,
        requiredEmail: void 0,
        requiredUrl: void 0,
        requiredObject: void 0,
        subdoc: {
            requiredString: void 0
        }
    });
    test.isTrue(ssr.invalidKeys().length === 8);

    ssr.validate({
        requiredString: "",
        requiredBoolean: null,
        requiredNumber: null,
        requiredDate: null,
        requiredEmail: null,
        requiredUrl: null,
        requiredObject: null,
        subdoc: {
            requiredString: ""
        }
    });
    test.isTrue(ssr.invalidKeys().length === 8);

    ssr.validate({
        requiredString: "   ",
        requiredBoolean: null,
        requiredNumber: null,
        requiredDate: null,
        requiredEmail: null,
        requiredUrl: null,
        requiredObject: null,
        subdoc: {
            requiredString: "   "
        }
    });
    test.isTrue(ssr.invalidKeys().length === 8);

    //test opposite case
    ssr.validate({
        requiredString: "test",
        requiredBoolean: true,
        requiredNumber: 1,
        requiredDate: (new Date()),
        requiredEmail: "test123@sub.example.edu",
        requiredUrl: "http://google.com",
        requiredObject: {},
        subdoc: {
            requiredString: "test"
        }
    });
    test.isTrue(ssr.invalidKeys().length === 0);
});

Tinytest.add("SimpleSchema - Set Required", function(test) {
    ssr.validate({$set: {}});
    test.isTrue(ssr.invalidKeys().length === 0); //would not cause DB changes, so should not be an error

    ssr.validate({$set: {
            requiredString: null,
            requiredBoolean: null,
            requiredNumber: null,
            requiredDate: null,
            requiredEmail: null,
            requiredUrl: null,
            requiredObject: null,
            'subdoc.requiredString': null
        }});
    test.isTrue(ssr.invalidKeys().length === 8);

    ssr.validate({$set: {
            requiredString: void 0,
            requiredBoolean: void 0,
            requiredNumber: void 0,
            requiredDate: void 0,
            requiredEmail: void 0,
            requiredUrl: void 0,
            requiredObject: void 0,
            'subdoc.requiredString': void 0
        }});
    test.isTrue(ssr.invalidKeys().length === 0); //would not cause DB changes, so should not be an error

    ssr.validate({$set: {
            requiredString: "",
            requiredBoolean: null,
            requiredNumber: null,
            requiredDate: null,
            requiredEmail: null,
            requiredUrl: null,
            requiredObject: null,
            'subdoc.requiredString': ""
        }});
    test.isTrue(ssr.invalidKeys().length === 8);

    ssr.validate({$set: {
            requiredString: "   ",
            requiredBoolean: null,
            requiredNumber: null,
            requiredDate: null,
            requiredEmail: null,
            requiredUrl: null,
            requiredObject: null,
            'subdoc.requiredString': "   "
        }});
    test.isTrue(ssr.invalidKeys().length === 8);

    //test opposite case
    ssr.validate({$set: {
            requiredString: "test",
            requiredBoolean: true,
            requiredNumber: 1,
            requiredDate: (new Date()),
            requiredEmail: "test123@sub.example.edu",
            requiredUrl: "http://google.com",
            requiredObject: {},
            'subdoc.requiredString': "test"
        }});
    test.isTrue(ssr.invalidKeys().length === 0);
});

Tinytest.add("SimpleSchema - Unset Required", function(test) {
    ssr.validate({$unset: {}});
    test.isTrue(ssr.invalidKeys().length === 0); //would not cause DB changes, so should not be an error

    ssr.validate({$unset: {
            requiredString: 1,
            requiredBoolean: 1,
            requiredNumber: 1,
            requiredDate: 1,
            requiredEmail: 1,
            requiredUrl: 1
        }});
    test.isTrue(ssr.invalidKeys().length === 6);
});

Tinytest.add("SimpleSchema - Insert Type Check", function(test) {
    ss.validate({
        string: "test",
        boolean: true,
        number: 1,
        date: (new Date()),
        url: "http://google.com",
        email: "test123@sub.example.edu"
    });
    test.isTrue(ss.invalidKeys().length === 0);

    /* STRING FAILURES */

    //boolean string failure
    ss.validate({
        string: true
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //number string failure
    ss.validate({
        string: 1
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //object string failure
    ss.validate({
        string: {test: "test"}
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //array string failure
    ss.validate({
        string: ["test"]
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //instance string failure
    ss.validate({
        string: (new Date())
    });
    test.isTrue(ss.invalidKeys().length === 1);

    /* BOOLEAN FAILURES */

    //string bool failure
    ss.validate({
        boolean: "test"
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //number bool failure
    ss.validate({
        boolean: 1
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //object bool failure
    ss.validate({
        boolean: {test: "test"}
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //array bool failure
    ss.validate({
        boolean: ["test"]
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //instance bool failure
    ss.validate({
        boolean: (new Date())
    });
    test.isTrue(ss.invalidKeys().length === 1);

    /* NUMBER FAILURES */

    //string number failure
    ss.validate({
        number: "test"
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //boolean number failure
    ss.validate({
        number: true
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //object number failure
    ss.validate({
        number: {test: "test"}
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //array number failure
    ss.validate({
        number: ["test"]
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //instance number failure
    ss.validate({
        number: (new Date())
    });
    test.isTrue(ss.invalidKeys().length === 1);

    /* INSTANCE FAILURES */

    //string date failure
    ss.validate({
        date: "test"
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //boolean date failure
    ss.validate({
        date: true
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //object date failure
    ss.validate({
        date: {test: "test"}
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //array date failure
    ss.validate({
        date: ["test"]
    });
    test.isTrue(ss.invalidKeys().length === 1);

    //number date failure
    ss.validate({
        date: 1
    });
    test.isTrue(ss.invalidKeys().length === 1);

    /* REGEX FAILURES */

    ss.validate({
        url: "blah"
    });
    test.isTrue(ss.invalidKeys().length === 1);

    ss.validate({
        email: "blah"
    });
    test.isTrue(ss.invalidKeys().length === 1);

});

Tinytest.add("SimpleSchema - Update Type Check", function(test) {
    ss.validate({$set: {
            string: "test",
            boolean: true,
            number: 1,
            date: (new Date()),
            url: "http://google.com",
            email: "test123@sub.example.edu"
        }});
    test.isTrue(ss.invalidKeys().length === 0);

    /* STRING FAILURES */

    //boolean string failure
    ss.validate({$set: {
            string: true
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //number string failure
    ss.validate({$set: {
            string: 1
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //object string failure
    ss.validate({$set: {
            string: {test: "test"}
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //array string failure
    ss.validate({$set: {
            string: ["test"]
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //instance string failure
    ss.validate({$set: {
            string: (new Date())
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    /* BOOLEAN FAILURES */

    //string bool failure
    ss.validate({$set: {
            boolean: "test"
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //number bool failure
    ss.validate({$set: {
            boolean: 1
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //object bool failure
    ss.validate({$set: {
            boolean: {test: "test"}
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //array bool failure
    ss.validate({$set: {
            boolean: ["test"]
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //instance bool failure
    ss.validate({$set: {
            boolean: (new Date())
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    /* NUMBER FAILURES */

    //string number failure
    ss.validate({$set: {
            number: "test"
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //boolean number failure
    ss.validate({$set: {
            number: true
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //object number failure
    ss.validate({$set: {
            number: {test: "test"}
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //array number failure
    ss.validate({$set: {
            number: ["test"]
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //instance number failure
    ss.validate({$set: {
            number: (new Date())
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    /* INSTANCE FAILURES */

    //string date failure
    ss.validate({$set: {
            date: "test"
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //boolean date failure
    ss.validate({$set: {
            date: true
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //object date failure
    ss.validate({$set: {
            date: {test: "test"}
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //array date failure
    ss.validate({$set: {
            date: ["test"]
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    //number date failure
    ss.validate({$set: {
            date: 1
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    /* REGEX FAILURES */

    ss.validate({$set: {
            url: "blah"
        }});
    test.isTrue(ss.invalidKeys().length === 1);

    ss.validate({$set: {
            email: "blah"
        }});
    test.isTrue(ss.invalidKeys().length === 1);

});