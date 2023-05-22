import { useState , useEffect } from "react"
import "./style.css"

export default function FolderStructureMaker(){

	const [addNew,setAddNew] = useState(["main","",false]) 
	// first parameter indicates in which folder new addition must be done .
	// third parameter indicates wheather input should be vissible or not .
	const [folders,setFolder] = useState([])
	// const [subFolders,setSubFolders] = useState([]) - for further nested folder functionality, not implemeted yet.


	function CreateFolder(e,folderName){
		folderName = folderName == undefined ? "main" : folderName
		e.preventDefault()
		let folder_template = [{
			"FolderName":e.target[0].value,
			"SubFiles":[]
		}]
		setFolder([...folders,...folder_template])
	}

	function CreateFile(e,folder_Name){
		e.preventDefault()
		let query_folder = folders
		for(let i of query_folder){
			if(i.FolderName == folder_Name){
				i.SubFiles.push(e.target[0].value)
			}
		}
		setFolder([...query_folder])
		console.log(query_folder)
	}

	document.addEventListener("click",(e) => {
		if (e.target.className==="con"){ 
			let temp = addNew
			temp[2] = false
			// console.log("addnew cleared",temp)
			setAddNew([...temp]) ; // console.log(folders)
		}
	});

	function NewFolderAdditionHelper(folderName){
		let temp = addNew
		temp[0] = folderName
		temp[1] = "folder"
		temp[2] = true
		// console.log(temp)
		setAddNew([...temp])
	}

	function NewFileAdditionHelper(folderName){
		let temp = addNew
		temp[0] = folderName
		temp[1] = "file"
		temp[2] = true
		// console.log(temp)
		setAddNew([...temp])
	}

	return(
		<>
			<div className="con">
				<div className="top_bar">
					<h2>🔻📁Main/Root Folder</h2>
					<h5 onClick={() => NewFolderAdditionHelper("main") } > | 📁New Folder+</h5>
					<h5 onClick={() => NewFileAdditionHelper("main") } >| 📰New File+</h5>
					{ 
						addNew[0] == "main" && addNew[2] && <form onSubmit = {e => {
								addNew[1] == "folder" ? CreateFolder(e) : CreateFile(e);
							}}>
							<input type="text" placeholder={`Create ${addNew[1]} ...`} ></input>
							<input type="submit"></input>
						</form> 
					}
				</div>
				
				{
					folders.map((f,id1) => {
						return <div key={id1} className="sub-folders-con">
							<div className="sub-folders">
								<h2>🔻📁{f.FolderName}</h2>
								<h5 onClick={() => NewFolderAdditionHelper(f.FolderName) } > | 📁New Folder+</h5>
								<h5 onClick={() => NewFileAdditionHelper(f.FolderName) } > | 📰New File+</h5>
								{ 
									addNew[0] == f.FolderName && addNew[2] && <form onSubmit = {e => {
											addNew[1] == "folder" ? CreateFolder(e,f.folderName) : CreateFile(e,f.FolderName);
										}}>
										<input type="text" placeholder={`Create ${addNew[1]} ...`} ></input>
										<input type="submit"></input>
									</form> 
								}
							</div>
							{
								f.SubFiles.map((file,id2) => {
									return <div key={id2} className="sub-files">
										<h2>▶ {file}</h2>
									</div>
								})
							}
						</div>
					})
				}

			</div>
		</>
	)

}
