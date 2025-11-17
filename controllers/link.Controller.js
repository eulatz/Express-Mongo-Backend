import { nanoid } from "nanoid";
import { Link } from "../models/links.js"

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid });
    res.json(links);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};


export const getLink = async(req,res) => {
    try {
      const {id} = req.params
    const link = await Link.findById(id);

      if(!link){
        return res.status(404).json('no existe el link');
      }
      if (!link.uid.equals(req.uid)){
        return res.status(401).json({error: "no te pertenece ese id"})
      }

    return res.status(201).json(link);

  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId"){
      return res.status(403).json({error: " formato incorrecto"})
    }
    res.status(500).json({ error: "Error del servidor" });
  }
}


export const removeLink = async(req,res) => {
    try {
      const {id} = req.params
      const link = await Link.findById(id);

      if(!link){
        return res.status(404).json('no existe el link');
      }
      if (!link.uid.equals(req.uid)){
        return res.status(401).json({error: "no te pertenece ese id"})
      }

      await Link.findByIdAndDelete(id);

    return res.status(200).json({message: 'link eliminado :' + link});

  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId"){
      return res.status(403).json({error: " formato incorrecto"})
    }
    res.status(500).json({ error: "Error del servidor" });
  }
}


export const updateLink = async(req,res) => {
    try {
      const {id} = req.params
      const {longLink} = req.body
      
      console.log(longLink)
      
      if(!longLink.startsWith('https://')){
        longLink = "https://" + longLink
      }
      
      const link = await Link.findById(id);

      if(!link) return res.status(404).json('no existe el link');
      if (!link.uid.equals(req.uid)) return res.status(401).json({error: "no te pertenece ese id"})
      
        link.longLink = longLink
        await link.save()

    return res.status(200).json(link);


  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId"){
      return res.status(403).json({error: " formato incorrecto"})
    }
    res.status(500).json({ error: "Error del servidor" });
  }
}


export const createLink = async(req,res) => {
    try {

        let {longLink} = req.body
          console.log("Body recibido:", req.body)

        if (!longLink.startsWith('https://')) {
                longLink = 'https://' + longLink
            }

        console.log(longLink)
        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid })
        const newLink = await link.save()

        return res.status(201).json({newLink})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"error de servidor"})
    }
}