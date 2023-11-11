ActiveAdmin.register Tag do
  # filter :associated_locations_id, collection: proc { Location.all }, as: :select
  filter :locations_name, :as => :select, :collection => Location.all.collect {|o| [o.name, o.name]}

  
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :name
  # or
  #
  # permit_params do
  #   permitted = [:name]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
