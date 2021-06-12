const collectionInit = () => {
    ///COLLECTION TYPE FORM INPUTS
    const collectionType = document.getElementById('collection-type');
    const collectionTypeDesc = document.getElementById("collection-type-description");
    const collectionTypeName = document.getElementById('collection-type-name');

    const collectionTypeSubmit = document.getElementById("collection-type-submit");
    const shouldNavigateAway = false;

    //Dynamic dropmenu load
    const typeDropdown = async () => {

        let typesObj = await collectionAPI.getCollectionTypes();
        sessionStorage.setItem('collectionTypes', JSON.stringify(typesObj))

        let dropdownType = document.getElementById('collection-type')

        for (type of typesObj) {
            let option = document.createElement('option');
            option.textContent = type.mediumType;
            dropdownType.append(option);
        }

        return typesObj;
    }
    typeDropdown();

    const handleCollectionTypeSubmit = async (event) => {
        event.preventDefault();

        let user = JSON.parse(sessionStorage.authUser);
        let collectionTypes = JSON.parse(sessionStorage.collectionTypes);

        let mediumId;
        for (const [key, value] of Object.entries(collectionTypes)) {
            console.log(value.id)
            if (value.mediumType === collectionType.value) {
                mediumId = value.id;
            }
        }

        let collectionTypeData = {
            "account": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            },
            "collType": {
                "id": mediumId,
                "mediumType": collectionType.value
            },
            "collectionName": collectionTypeName.value.trim(),
            "collectionDescrip": collectionTypeDesc.value
        };
        collectionAPI.addCollection(collectionTypeData);
    }

    const validateInputs = () => {
        let isValid = true;
        if (collectionType.value === "Select a Collection Type") isValid = false;

        if (!collectionTypeName.value.trim()) isValid = false;

        isValid ? collectionTypeSubmit.removeAttribute('disabled') : collectionTypeSubmit.setAttribute('disabled', true);
    }

    //EVENT LISTENERS

    document.querySelectorAll('input').forEach(element => element.addEventListener("input", validateInputs));

    collectionTypeSubmit.addEventListener('click', function (event) {
        // shouldNavigateAway;
        handleCollectionTypeSubmit(event);

    })
}
collectionInit();