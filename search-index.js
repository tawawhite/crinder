crystal_doc_search_index_callback({"repository_name":"github.com/c910335/crinder","body":"# Crinder\n\n[![Build Status](https://travis-ci.org/c910335/crinder.svg?branch=master)](https://travis-ci.org/c910335/crinder)\n[![GitHub releases](https://img.shields.io/github/release/c910335/crinder.svg)](https://github.com/c910335/crinder/releases)\n[![GitHub license](https://img.shields.io/github/license/c910335/crinder.svg)](https://github.com/c910335/crinder/blob/master/LICENSE)\n\nClass based json renderer in Crystal\n\n## Installation\n\nAdd this to your application's `shard.yml`:\n\n```yaml\ndependencies:\n  crinder:\n    github: c910335/crinder\n```\n\n## Usage\n\n### Basic\n\n```crystal\nrequire \"crinder\"\n\nrecord Todo, name : String, priority : Int32, expires_at : Time?, created_at : Time?, updated_at : Time?\n\nclass TodoRenderer < Crinder::Base(Todo)\n  field name : String, as: title\n  field priority : Int, value: ->{ object.priority * 10 }\n  field expires_at : String, as: deadline, unless: ->{ object.priority < 3 }\n  field created_at : String, if: ->{ object.priority > 5 }\n  field updated : Bool, value: updated?\n\n  def self.updated?\n    !object.updated_at.nil?\n  end\nend\n\ntime = Time.utc(2018, 3, 14, 19, 55, 7)\ntodo = Todo.new(\"qaq\", 8, time + 20.hours, time, nil)\n\nTodoRenderer.render(todo) # => \"{\\\"title\\\":\\\"qaq\\\",\\\"priority\\\":80,\\\"deadline\\\":\\\"2018-03-15 15:55:07 UTC\\\",\\\"created_at\\\":\\\"2018-03-14 19:55:07 UTC\\\",\\\"updated\\\":false}\"\n```\n\n### Inheritance\n\n```crystal\nclass AnotherTodoRenderer < TodoRenderer\n  remove updated\n  remove expires_at\n  field updated_at : String\nend\n\ntodo = Todo.new(\"wow\", 6, time + 20.hours, time, time + 10.hours)\n\nAnotherTodoRenderer.render(todo) # => \"{\\\"title\\\":\\\"wow\\\",\\\"priority\\\":60,\\\"created_at\\\":\\\"2018-03-14 19:55:07 UTC\\\",\\\"updated_at\\\":\\\"2018-03-15 05:55:07 UTC\\\"}\"\n```\n\n### Array\n\n```crystal\ntodos = [Todo.new(\"www\", 8, time + 20.hours, time, nil), Todo.new(\"api\", 10, time + 21.hours, time, nil)]\n\nTodoRenderer.render(todos) # => \"[{\\\"title\\\":\\\"www\\\",\\\"priority\\\":80,\\\"deadline\\\":\\\"2018-03-15 15:55:07 UTC\\\",\\\"created_at\\\":\\\"2018-03-14 19:55:07 UTC\\\",\\\"updated\\\":false},{\\\"title\\\":\\\"api\\\",\\\"priority\\\":100,\\\"deadline\\\":\\\"2018-03-15 16:55:07 UTC\\\",\\\"created_at\\\":\\\"2018-03-14 19:55:07 UTC\\\",\\\"updated\\\":false}]\"\n```\n\n### Nested\n\n```crystal\nclass TimeRenderer < Crinder::Base(Time?)\n  field year : Int\n  field month : Int\n  field day : Int\n  field hour : Int\n  field minute : Int\n  field second : Int\nend\n\nclass NestedTodoRenderer < TodoRenderer\n  remove expires_at\n  remove updated\n  field created_at, with: TimeRenderer\nend\n\ntodo = Todo.new(\"wtf\", 3, time + 20.hours, time, nil)\n\nNestedTodoRenderer.render(todo) # => \"{\\\"title\\\":\\\"wtf\\\",\\\"priority\\\":30,\\\"created_at\\\":{\\\"year\\\":2018,\\\"month\\\":3,\\\"day\\\":14,\\\"hour\\\":19,\\\"minute\\\":55,\\\"second\\\":7}}\"\n```\n\n## Contributing\n\n1. Fork it ( https://github.com/c910335/crinder/fork )\n2. Create your feature branch (git checkout -b my-new-feature)\n3. Commit your changes (git commit -am 'Add some feature')\n4. Push to the branch (git push origin my-new-feature)\n5. Create a new Pull Request\n\n## Contributors\n\n- [c910335](https://github.com/c910335) Tatsiujin Chin - creator, maintainer\n","program":{"html_id":"github.com/c910335/crinder/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"superclass":null,"ancestors":[],"locations":[],"repository_name":"github.com/c910335/crinder","program":true,"enum":false,"alias":false,"aliased":"","const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"github.com/c910335/crinder/Crinder","path":"Crinder.html","kind":"module","full_name":"Crinder","name":"Crinder","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"crinder/version.cr","line_number":1,"url":"https://github.com/c910335/crinder/blob/f725615e1fab75e5e5726618647b5f462ea0691b/src/crinder/version.cr"}],"repository_name":"github.com/c910335/crinder","program":false,"enum":false,"alias":false,"aliased":"","const":false,"constants":[{"name":"VERSION","value":"\"0.1.4\"","doc":null,"summary":null}],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"github.com/c910335/crinder/Crinder/Base","path":"Crinder/Base.html","kind":"class","full_name":"Crinder::Base(T)","name":"Base","abstract":false,"superclass":{"html_id":"github.com/c910335/crinder/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"github.com/c910335/crinder/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"github.com/c910335/crinder/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"crinder.cr","line_number":27,"url":"https://github.com/c910335/crinder/blob/f725615e1fab75e5e5726618647b5f462ea0691b/src/crinder.cr"}],"repository_name":"github.com/c910335/crinder","program":false,"enum":false,"alias":false,"aliased":"","const":false,"constants":[{"name":"SETTINGS","value":"{} of Nil => Nil","doc":null,"summary":null}],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"github.com/c910335/crinder/Crinder","kind":"module","full_name":"Crinder","name":"Crinder"},"doc":"`Crinder::Base` is the base renderer of type `T`.\n\nTo define your own renderer, you need to inherit `Crinder::Base` with specific type and declare the fields with `field`.\n\nFor example, this is a renderer of [Time](https://crystal-lang.org/api/0.24.2/Time.html).\n\n```\nclass TimeRenderer < Crinder::Base(Time)\n  field year : Int\n  field month : Int\n  field day : Int\n  field hour : Int\n  field minute : Int\n  field second : Int\nend\n```\n\nThen `.render` will be auto generated.\n\n```\ntime = Time.new(2018, 3, 15, 16, 21, 1)\nTimeRenderer.render(time) # => \"{\\\"year\\\":2018,\\\"month\\\":3,\\\"day\\\":15,\\\"hour\\\":16,\\\"minute\\\":21,\\\"second\\\":1}\"\n```","summary":"<p><code><a href=\"../Crinder/Base.html\">Crinder::Base</a></code> is the base renderer of type <code>T</code>.</p>","class_methods":[{"id":"object-class-method","html_id":"object-class-method","name":"object","doc":"the getter of the object to be rendered, which can be used in `value`, `if` or `unless`","summary":"<p>the getter of the object to be rendered, which can be used in <code>value</code>, <code>if</code> or <code>unless</code></p>","abstract":false,"args":[],"args_string":"","source_link":"https://github.com/c910335/crinder/blob/f725615e1fab75e5e5726618647b5f462ea0691b/src/crinder.cr#L31","source_link":"https://github.com/c910335/crinder/blob/f725615e1fab75e5e5726618647b5f462ea0691b/src/crinder.cr#L31","def":{"name":"object","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@@object.not_nil!"}}],"constructors":[],"instance_methods":[],"macros":[{"id":"field(decl,**options)-macro","html_id":"field(decl,**options)-macro","name":"field","doc":"Defines a field.\n\n### Example\n\nSee [README](../index.html) or [Overview](#top).\n\n### Usage\n\n`field` requries a name or a type declaration and a series of named arguments as options.\n\n```\nfield name : type, **options\n```\n\n- **name**: (required) the field name to be rendered\n- **as**: the name to be replaced in the rendered json\n- **type**: the type for auto casting. For example, if it is `String`, `#to_s` of the field will be called for rendering. This is JSON Type but not Crystal Type, so it must be one of [JSON::Type](https://crystal-lang.org/api/0.24.2/JSON/Type.html), and it should be `Int` instead of `Int64` or `Int32` if this field is integer, and so does `Float`. If it is `Nil` or not provided, no casting method will be performed.\n- **value**: a lambda, a class method or a constant to replace the value. By default, it is an auto generated class method `name` which casting the field to `type`. If `value` is provided, `type` becomes useless because `value` replaces the auto generated class method. However, it is still recommended to declare `type` for understandability. Don't use `value` and `as` together because it makes `name` meaningless.\n- **with**: a renderer for this field. This field will be filtered by `value` before passing to it. It is not necessary to be a subclass of `Crinder::Base`, but it must have the class method `render(object : T, json : JSON::Builder)` where `T` is the original type of this field.\n- **if**: a lambda, a class method or a constant to determine whether to show this field.\n- **unless**: opposite of `if`. If both `if` and `unless` are provided, this field is only showed when `if` is *truthy* and `unless` is *falsey*.","summary":"<p>Defines a field.</p>","abstract":false,"args":[{"name":"decl","doc":null,"default_value":"","external_name":"decl","restriction":""}],"args_string":"(decl, **options)","source_link":"https://github.com/c910335/crinder/blob/f725615e1fab75e5e5726618647b5f462ea0691b/src/crinder.cr#L86","def":{"name":"field","args":[{"name":"decl","doc":null,"default_value":"","external_name":"decl","restriction":""}],"double_splat":{"name":"options","doc":null,"default_value":"","external_name":"options","restriction":""},"splat_index":null,"block_arg":null,"visibility":"Public","body":"    \n{% name = decl\ntype = Nil\nif decl.is_a?(TypeDeclaration)\n  type = decl.type.resolve\n  name = decl.var\nend\nname = name.id\nSETTINGS[@type.id][name] = options || ({} of Nil => Nil)\nSETTINGS[@type.id][name][:type] = type\nvalue = options[:value]\n %}\n\n\n    \n{% if value.is_a?(NilLiteral) %}\n      {% SETTINGS[@type.id][name][:value] = name %}\n\n      def self.{{ name }}\n        {% if type <= Array %}\n          object.{{ name }}.to_a\n        {% else %}{% if type <= Bool %}\n          !!object.{{ name }}\n        {% else %}{% if type <= Float %}\n          object.{{ name }}.to_f64\n        {% else %}{% if type <= Hash %}\n          object.{{ name }}.to_h\n        {% else %}{% if type <= String %}\n          object.{{ name }}.to_s\n        {% else %}{% if type <= Int %}\n          object.{{ name }}.to_i64\n        {% else %}\n          object.{{ name }}\n        {% end %}{% end %}{% end %}{% end %}{% end %}{% end %}\n      end\n    {% end %}\n\n  \n"}},{"id":"remove(name)-macro","html_id":"remove(name)-macro","name":"remove","doc":"Undefines a field.","summary":"<p>Undefines a field.</p>","abstract":false,"args":[{"name":"name","doc":null,"default_value":"","external_name":"name","restriction":""}],"args_string":"(name)","source_link":"https://github.com/c910335/crinder/blob/f725615e1fab75e5e5726618647b5f462ea0691b/src/crinder.cr#L124","def":{"name":"remove","args":[{"name":"name","doc":null,"default_value":"","external_name":"name","restriction":""}],"double_splat":null,"splat_index":null,"block_arg":null,"visibility":"Public","body":"    \n{% name = name.id %}\n\n    \n{% SETTINGS[@type.id][name] = {:unless => true} %}\n\n\n    def self.\n{{ name }}\n\n      nil\n    \nend\n  \n"}}],"types":[]}]}]}})