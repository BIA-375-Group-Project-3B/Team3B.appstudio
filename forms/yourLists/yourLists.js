let req = {}
let query = ""
let results = []
let pw = "BiA375.ekh"  
let netID = "ekh74960"
let schema = "375groupb3"

yourLists.onshow=function(){        
  query = "SELECT list_name FROM lists"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)

  if (req.status == 200) { 
    results = JSON.parse(req.responseText)
    if (results.length == 0)    
       console.log("There are no customers in the database.")
   else { 
       rdoLists.clear()
       for (i = 0; i < results.length; i++)
           rdoLists.addItem(results[i])
    }
  } else
      console.log(`Error code: ${req.status}`)   
}

btnDeleteList.onclick=function(){
    let customerDelete = $("input[name=rdoLists]:checked").prop("value")
    query = "DELETE FROM lists WHERE list_name = '" + customerDelete + "'"      
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)
    
      if (req.status == 200) {
            if (req.responseText == 500) {    
                console.log(`You have successfully deleted the customer named ${customerDelete}`)
                
                query = "SELECT list_name FROM lists"
                req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)

                if (req.status == 200) { 
                    results = JSON.parse(req.responseText)
                    if (results.length == 0)    
                       console.log("There are no customers in the database.")
                    else { 
                       rdoLists.clear()
                       for (i = 0; i < results.length; i++)
                           rdoLists.addItem(results[i])
                    }
                } else
                    console.log(`Error code: ${req.status}`)
                
            } else
                console.log(`There was a problem deleting ${customerDelete} from the database.`)
      } else
            console.log(`Error: ${req.status}`)
}

btnAddList.onclick=function(){
    let newListName = inptNewListName.value
    let listUserID = Math.floor(Math.random() * 101)
    query = "INSERT INTO lists (`list_name`,`user_id`) VALUES ('" + newListName + "', '" + listUserID + "')"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)
    if (req.status == 200) { 
        if (req.responseText == 500)    
            console.log("You have successfully added the customer!")
        else
            console.log("There was a problem with adding the customer to the database.")
    } else 
        console.log(`Error: ${req.status}`)
    
    ChangeForm(newList)
}


hbgrPageNav.onclick=function(){
    if (typeof(s) == "object") {
       return
    } else {
       switch(s) {
        case "Your lists":
            ChangeForm(yourLists)
            break;
        case "Create new list":
            ChangeForm(newList)
            break;
        case "Find Store":
            ChangeForm(findStore)
            break;
        case "Weather":
            ChangeForm(weather)
            break;
        case "Coupons":
            ChangeForm(coupons)
            break;
        }
    }  
}
