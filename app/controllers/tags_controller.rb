class TagsController < ApplicationController
    before_action :set_tag, only: %i[ show edit update destroy ]
    
    def index
    end

    def show;end

    def new
      @tags = Tag.all
    end

    def edit
      @tags = Tag.all
    end

    def create
      @tag = Tag.new(tag_params)
  
      respond_to do |format|
        if @tag.save
          format.html { redirect_to tag_url(@tag), notice: "Tag was successfully created." }
          format.json { render :show, status: :created, tag: @tag }
        else
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: @location.errors, status: :unprocessable_entity }
        end
      end
    end
  
    def update
      respond_to do |format|
        if @tag.update(tag_params)
          format.html { redirect_to tag_url(@tag), notice: "Tag was successfully updated." }
          format.json { render :show, status: :ok, tag: @tag }
        else
          format.html { render :edit, status: :unprocessable_entity }
          format.json { render json: @tag.errors, status: :unprocessable_entity }
        end
      end
    end
  
    def destroy
      @tag.destroy
  
      respond_to do |format|
        format.html { redirect_to locations_url, notice: "Tag was successfully destroyed." }
        format.json { head :no_content }
      end
    end
  
    private
      def set_tag
        @tag = Tag.find(params[:id])
      end
  
      def tag_params
        params.require(:tag).permit(:name)
      end
  end
  