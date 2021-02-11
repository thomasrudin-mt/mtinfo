
function mtinfo.export_recipes()
	local data = {}

	for name in pairs(minetest.registered_items) do
		local recipes = minetest.get_all_craft_recipes(name)
		local export_recipes = {}

		if recipes then
			for _, recipe in ipairs(recipes) do
				local export_recipe = true
				for _, item in ipairs(recipe.items) do
					local is_group = item and string.sub(item, 6) == "group:"

					if not is_group then
						-- check not_in_creative_inventory group of item def
						local itemdef = minetest.registered_items[item]
						if itemdef and itemdef.groups and itemdef.groups.not_in_creative_inventory then
							export_recipe = false
						end
					end
				end

				if export_recipe then
					-- filter out moreblocks/stairs recipes (if the ingredient is not exported)
					table.insert(export_recipes, recipe)
				end

				data[name] = export_recipes
			end
		end
	end
	mtinfo.export_json(mtinfo.basepath.."/data/recipes.js", data, "mtinfo.recipes")

end
