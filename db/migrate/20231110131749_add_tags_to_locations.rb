class AddTagsToLocations < ActiveRecord::Migration[7.0]
  def change
    add_column :locations, :tags, :jsonb
  end
end
