require "./spec_helper"

record Todo, name : String, priority : Int32, expires_at : Time?, created_at : Time?, updated_at : Time?

class TimeRenderer < Crinder::Base(Time?)
  field year : Int
  field month : Int
  field day : Int
  field hour : Int
  field minute : Int
  field second : Int
end

class TodoRenderer < Crinder::Base(Todo)
  field name : String, as: title
  field priority : Int, value: ->{ object.priority * 10 }
  field expires_at : String, as: deadline, unless: ->{ object.priority < 3 }
  field created_at : String, if: ->{ object.priority > 5 }
  field updated : Bool, value: updated?

  def self.updated?
    !object.updated_at.nil?
  end
end

class AnotherTodoRenderer < TodoRenderer
  field expires_at : String, unless: ->{ object.priority < 1 }
  field created_at : String, if: ->{ object.priority > 8 }
  field updated_at : String
  remove updated
end

class YetAnotherTodoRenderer < AnotherTodoRenderer
  remove updated_at
end

class NestedTodoRenderer < TodoRenderer
  remove expires_at
  remove updated
  field created_at, with: TimeRenderer
end

describe Crinder::Base do
  describe ".render" do
    it "converts nil to null" do
      t = nil

      TimeRenderer.render(t).should eq("null")
    end

    it "converts object to json" do
      time = Time.utc(2018, 1, 29, 15, 23, 15)
      t = Todo.new("www", 8, time + 20.hours, time, nil)

      TodoRenderer.render(t).should eq(%({"title":"www","priority":80,"deadline":"2018-01-30 11:23:15 UTC","created_at":"2018-01-29 15:23:15 UTC","updated":false}))
    end

    it "converts multiple objects to json" do
      time = Time.utc(2018, 1, 29, 15, 23, 15)
      t = Todo.new("www", 8, time + 20.hours, time, nil)
      t2 = Todo.new("api", 10, time + 21.hours, time, nil)

      TodoRenderer.render([t, t2]).should eq(%([{"title":"www","priority":80,"deadline":"2018-01-30 11:23:15 UTC","created_at":"2018-01-29 15:23:15 UTC","updated":false},{"title":"api","priority":100,"deadline":"2018-01-30 12:23:15 UTC","created_at":"2018-01-29 15:23:15 UTC","updated":false}]))
    end

    context "with inheritance" do
      it "converts object to json" do
        time = Time.utc(2018, 1, 29, 17, 21, 34)
        t = Todo.new("QAQ", 3, time + 20.hours, time, time + 10.hours)

        AnotherTodoRenderer.render(t).should eq(%({"title":"QAQ","priority":30,"expires_at":"2018-01-30 13:21:34 UTC","updated_at":"2018-01-30 03:21:34 UTC"}))
      end
    end

    context "with multilevel inheritance" do
      it "converts object to json" do
        time = Time.utc(2018, 1, 29, 18, 42, 37)
        t = Todo.new("Wow", 9, time + 20.hours, time, time + 10.hours)

        YetAnotherTodoRenderer.render(t).should eq(%({"title":"Wow","priority":90,"expires_at":"2018-01-30 14:42:37 UTC","created_at":"2018-01-29 18:42:37 UTC"}))
      end
    end

    context "with nested structure" do
      it "converts object to json" do
        time = Time.utc(2018, 3, 14, 18, 49, 59)
        t = Todo.new("WTF", 6, time, time, time)

        NestedTodoRenderer.render(t).should eq(%{{"title":"WTF","priority":60,"created_at":{"year":2018,"month":3,"day":14,"hour":18,"minute":49,"second":59}}})
      end
    end
  end
end
