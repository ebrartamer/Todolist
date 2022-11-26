const yeniGorev = document.querySelector('.inputGorev')
const yeniGorevEkleBtn = document.querySelector('.gorevbtn')
const gorevListesi = document.querySelector('.gorevListesi')


yeniGorevEkleBtn.addEventListener('click',gorevEkle)
gorevListesi.addEventListener('click',gorevSil)
document.addEventListener('DOMContentLoaded',localStorageOku) // var olan butun DOM yapısı yüklendikten sonra çağır

function gorevEkle(e){
    e.preventDefault()

    gorevItemOlustur(yeniGorev.value)
    localStorageKaydet(yeniGorev.value)
    yeniGorev.value=' '
}

function gorevSil(e){
    e.preventDefault()
    //console.log(e.target) olayın nerde gerçekleştiğini gösterir
    const tiklanilanEleman=e.target

    if(tiklanilanEleman.classList.contains('tamamlandi')){
       tiklanilanEleman.parentElement.classList.toggle('gorevTamamlandi')
    }
    if(tiklanilanEleman.classList.contains('sil')){
        tiklanilanEleman.parentElement.classList.toggle('kaybol')

        tiklanilanEleman.parentElement.addEventListener('transitioned',function(){
        tiklanilanEleman.parentElement(remove())
     })
        const silinecekGorev=tiklanilanEleman.parentElement.children[0].innerText
        localStorageSil(silinecekGorev)
    }
}
function localStorageKaydet(yeniGorev){
    let gorevler
    if(localStorage.getItem('gorevler')===null){
        gorevler=[];
    }
    else{
        gorevler=JSON.parse(localStorage.getItem('gorevler'))
    }
    gorevler.push(yeniGorev)
    localStorage.setItem('gorevler',JSON.stringify(gorevler))

}

function localStorageOku(){
    let gorevler
    if(localStorage.getItem('gorevler')===null){
        gorevler=[];
    }
    else{
        gorevler=JSON.parse(localStorage.getItem('gorevler'))
    }
    gorevler.forEach(function (gorev) {
        gorevItemOlustur(gorev);
    });
}

function gorevItemOlustur(gorev){

    //div oluşturma
    const gorevDiv=document.createElement('div')
    gorevDiv.classList.add('gorevitem')

    //li oluşturma
    const gorevLi =document.createElement('li')
    gorevLi.classList.add('gorevTanim')
    
    gorevDiv.appendChild(gorevLi)
    gorevLi.innerText=gorev

    //ul'ye oluşturduğumuz divi ekleyelim 
    gorevListesi.appendChild(gorevDiv)

    //tamamlandı butonu ekleyelim
    const gorevTamamBtn=document.createElement('button')
    gorevTamamBtn.classList.add('tamamlandi')
    gorevTamamBtn.innerHTML='<i class="fa-solid fa-check"></i>'
    gorevDiv.appendChild(gorevTamamBtn)

    //sil butonunu ekleyelim
    const btnSil = document.createElement('button')
    btnSil.classList.add('sil')
    btnSil.innerHTML='<i class="fa-solid fa-trash"></i>'
    gorevDiv.appendChild(btnSil)
}
function localStorageSil(gorev){
    let gorevler
    if(localStorage.getItem('gorevler')===null){
        gorevler=[];
    }
    else{
        gorevler=JSON.parse(localStorage.getItem('gorevler'))
    }

    // splice ile item sil
     const silinecekElemanIndex= gorevler.indexOf(gorev)
     gorevler.splice(silinecekElemanIndex,1)

     localStorage.setItem('gorevler',JSON.stringify(gorevler))
     window.location.reload(true); 
     window.location.reload(); 
}