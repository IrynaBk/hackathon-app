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
  form do |f|
    f.inputs 'Location Details' do
      f.input :name
      f.input :address
      f.input :latitude
      f.input :longitude
      f.input :tags, as: :check_boxes 
    end
    f.actions
  end

  index do
    selectable_column
    id_column
    column :name
    column :address
    column :latitude
    column :longitude
    column :tags do |location|
      location.tags.map(&:name).join(', ')
    end
    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :address
      row :latitude
      row :longitude
      row :tags do |location|
        location.tags.map(&:name).join(', ')
      end
    end
    active_admin_comments
  end

  #
  # permit_params do
  #   permitted = [:name, :address, :latitude, :longitude, :tags]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
