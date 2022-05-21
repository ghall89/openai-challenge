const rspArr = [];

const displayChat = () => {
	const chatArea = document.querySelector('#chat-area');
	const item = rspArr[rspArr.length - 1];

	const chatItem = `
	<li
		class="
			list-group-item
			d-flex
			justify-content-between
			align-items-start
		"
	>
		<div class="ms-2 me-auto">
			<div class="fw-bold">${item.query}</div>
			${item.response}
		</div>
	</li>
	`;

	chatArea.insertAdjacentHTML('afterbegin', chatItem);
};

const send = () => {
	event.preventDefault();

	const queryInput = document.querySelector('#query-input');
	const queryValue = queryInput.value;
	queryInput.value = '';

	fetch('./callapi', {
		method: 'GET',
		headers: {
			query: queryValue
		}
	})
		.then(rsp => rsp.text())
		.then(data => {
			const msg = {
				query: queryValue,
				response: data
			};

			rspArr.push(msg);
			displayChat();
		});
};
