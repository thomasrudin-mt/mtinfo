local count = 0
local size = 0

function mtinfo.export_textures()
	for _, modname in ipairs(minetest.get_modnames()) do
	  local modpath = minetest.get_modpath(modname)
	  local destination_path = mtinfo.basepath .. "/textures"
	  minetest.mkdir(destination_path)

	  if modpath then
	    local texturepath = modpath .. "/textures"
	    local dir_list = minetest.get_dir_list(texturepath)
	    for _, filename in pairs(dir_list) do
	      count = count + 1
	      size = size + mtinfo.copyfile(texturepath .. "/" .. filename, destination_path .. "/" .. filename)
	    end
	  end
	end
	print("[mtinfo] exported " .. count .. " textures (" .. size .. " bytes)")
	local data = {
		count = count,
		size = size
	}
	mtinfo.export_json(mtinfo.basepath.."/data/textures.js", data, "mtinfo.textures")

end
