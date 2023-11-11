class MapController < ApplicationController
  def index
    @locations = tag_ids.empty? ? Location.all : filtered_locations
    @tags = Tag.all
  end

  private

  def tag_ids
    params.fetch(:tags, [])&.map(&:to_i)
  end

  def filtered_locations
    Location.joins(:tags)
       .where(tags: { id: tag_ids })
       .group('locations.id')
       .having('COUNT(DISTINCT tags.id) = ?', tag_ids.length)
  end
end
