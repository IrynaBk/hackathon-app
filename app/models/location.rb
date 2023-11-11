class Location < ApplicationRecord
    has_and_belongs_to_many :tags

    geocoded_by :address
    after_validation :geocode, if: :address_changed?


    def self.ransackable_attributes(auth_object = nil)
        %w[name address latitude longitude created_at updated_at tags]
    end

    def self.ransackable_associations(auth_object = nil)
        ["tags"]
      end
end
