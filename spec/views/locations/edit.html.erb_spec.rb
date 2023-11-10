require 'rails_helper'

RSpec.describe "locations/edit", type: :view do
  let(:location) {
    Location.create!(
      name: "MyString",
      address: "MyString",
      latitude: 1.5,
      longitude: 1.5
    )
  }

  before(:each) do
    assign(:location, location)
  end

  it "renders the edit location form" do
    render

    assert_select "form[action=?][method=?]", location_path(location), "post" do

      assert_select "input[name=?]", "location[name]"

      assert_select "input[name=?]", "location[address]"

      assert_select "input[name=?]", "location[latitude]"

      assert_select "input[name=?]", "location[longitude]"
    end
  end
end
