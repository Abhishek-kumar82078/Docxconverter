document.querySelectorAll(".drag-drop-input").forEach((inputElement) =>{
  const dragDropElement =inputElement.closest(".drag-drop");

  dragDropElement.addEventListener("click", (e) =>{
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) =>{
    if(inputElement.files.length)
    {
      updatethumbnail(dragDropElement,inputElement.files[0]);
    }
  });

  dragDropElement.addEventListener('dragover', (e) =>{
    e.preventDefault();
    dragDropElement.classList.add("drag-drop-over");
  });

  ["dragleave","dragend"].forEach((type) =>{
     dragDropElement.addEventListener(type, (e) =>{
       cout<<"hello";
       dragDropElement.classList.remove("drag-drop-over");
     });
     
  });

  dragDropElement.addEventListener("drop",e=>{
    e.preventDefault();

    if(e.dataTransfer.files.length)
    {
      inputElement.files=e.dataTransfer.files;
      updatethumbnail( dragDropElement,e.dataTransfer.files[0]);
    }
  });

  dragDropElement.classList.remove("drag-drop-over");
});

function updatethumbnail(dragDropElement,file)
{
   let thumbnailElement = dragDropElement.querySelector(".drag-drop-thumb");

   if(dragDropElement.querySelector('.drag-drop-tag'))
     dragDropElement.querySelector('.drag-drop-tag').remove();

     if(dragDropElement.querySelector('.drag-drop-img'))
     dragDropElement.querySelector('.drag-drop-img').remove();

   if(!thumbnailElement)
   {
     thumbnailElement = document.createElement('div');
     thumbnailElement.classList.add("drag-drop-thumb");
     dragDropElement.appendChild(thumbnailElement);

   }
    
   
   console.log(file);
   thumbnailElement.dataset.label=file.name;

   if(file.type.startsWith("application/"))
   {
     const reader = new FileReader();

     reader.readAsDataURL(file);
     reader.onload= () => {
      console.log("hi")
       thumbnailElement.style.backgroundImage=`url('image/docs.png')`;
     };
    }
     else
      thumbnailElement.style.backgroundImage = null;
   
}