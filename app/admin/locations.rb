ActiveAdmin.register Location do
  # filter :associated_tags_id, collection: proc { Tag.all }, as: :select
  filter :tags_name, as: :select, collection: -> { Tag.all.map { |tag| [tag.name, tag.name] } }
  
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :name, :address, :latitude, :longitude, tag_ids: []
  #
  # or
  #
  # permit_params do
  #   permitted = [:name, :address, :latitude, :longitude, :tags]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
