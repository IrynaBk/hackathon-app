class RemoveTagsFromLocations < ActiveRecord::Migration[7.0]
  def change
    remove_column :locations, :tags
  end
end
