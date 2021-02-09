local item_mapped_keys = {
	"name",
	"description",
	"groups",
	"inventory_image",
	"stack_max",
	"tool_capabilities",
	"range"
}

mtinfo.export_items = function()
  local data = {}

  mtinfo.map_list(data, minetest.registered_items, item_mapped_keys)
  mtinfo.export_json(mtinfo.basepath.."/data/items.js", data, "mtinfo.items")
end